/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a column
  function getColumnContent(col) {
    // Defensive: collect all direct children
    return Array.from(col.children);
  }

  // Find the two column containers
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return; // Defensive: must have two columns

  // First column: all content blocks (text, spacers, CTA)
  const col0Content = getColumnContent(columns[0]);
  // Second column: image block
  const col1Content = getColumnContent(columns[1]);

  // For the left column, collect all content except empty spacers
  const leftCells = [];
  col0Content.forEach((child) => {
    // Only add non-empty blocks
    if (
      child.classList.contains('spacer') &&
      child.querySelector('hr')
    ) {
      // Skip spacers
      return;
    }
    leftCells.push(child);
  });

  // For the right column, find the image element
  let rightCell = null;
  for (const el of col1Content) {
    if (el.classList.contains('image')) {
      const img = el.querySelector('img');
      if (img) {
        rightCell = el;
        break;
      }
    }
  }
  // If not found, fallback to all right column content
  if (!rightCell) {
    rightCell = columns[1];
  }

  // Table header
  const headerRow = ['Columns (columns192)'];
  // Table content row: left column, right column
  const contentRow = [leftCells, rightCell];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
