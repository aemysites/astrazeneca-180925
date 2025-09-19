/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child columns
  function getColumns(parent) {
    return Array.from(parent.querySelectorAll(':scope > div'));
  }

  // The block header row
  const headerRow = ['Columns (columns51)'];

  // Get the two column divs
  const columns = getColumns(element);
  if (columns.length < 2) return;

  // For each column, collect all its direct children (which are content blocks)
  // We'll combine all content in each column into a single cell
  function getColumnContent(colDiv) {
    // Only use direct children
    const children = Array.from(colDiv.children);
    // Filter out empty spacers and empty content
    return children.filter((child) => {
      if (child.classList.contains('spacer')) return false;
      // Remove empty divs and empty text blocks
      if (child.textContent.trim() === '' && child.children.length === 0) return false;
      if (child.classList.contains('text') && child.textContent.trim() === '') return false;
      return true;
    });
  }

  // Only keep columns with actual content
  const nonEmptyCols = columns
    .map(getColumnContent)
    .filter(blocks => blocks.length > 0)
    .map(blocks => (blocks.length === 1 ? blocks[0] : blocks));

  if (nonEmptyCols.length === 0) return;

  // Compose the table
  const cells = [headerRow, nonEmptyCols];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
