/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Helper: Only include children with meaningful content
  function getMeaningfulChildren(col) {
    const meaningful = [];
    Array.from(col.children).forEach(child => {
      if (child.classList.contains('spacer')) return;
      // Only include if it has text, images, or links
      if (
        child.textContent.trim() !== '' ||
        child.querySelector('img, picture, video, iframe, a')
      ) {
        meaningful.push(child);
      }
    });
    return meaningful;
  }

  // --- FIRST COLUMN ---
  const leftCellContent = getMeaningfulChildren(columns[0]);
  // --- SECOND COLUMN ---
  const rightCellContent = getMeaningfulChildren(columns[1]);

  // Always output two columns for this layout
  const headerRow = ['Columns (columns133)'];
  const contentRow = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
