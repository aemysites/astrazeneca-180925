/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  const headerRow = ['Columns (columns116)'];

  // For each column, gather all meaningful content as a single cell
  const contentRow = columns.map((col) => {
    // Gather all content except spacers (hr) and skip empty wrappers
    const meaningful = Array.from(col.children).filter((child) => {
      // Remove spacers (hr)
      if (child.classList.contains('spacer')) return false;
      // Remove wrappers with no meaningful content
      const hasContent = child.querySelector('h1,h2,h3,h4,h5,h6,p,ul,ol,li,a,button');
      if (!hasContent || child.textContent.trim() === '') return false;
      return true;
    });
    // If nothing left, skip this column
    if (meaningful.length === 0) return null;
    return meaningful.length === 1 ? meaningful[0] : meaningful;
  }).filter(cell => cell !== null);

  // Only build the table if there are at least 2 non-empty columns
  if (contentRow.length < 2) return;

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
