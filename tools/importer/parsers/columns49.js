/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns49)'];

  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare cells for each column, but only if they have content
  const cells = [];

  // LEFT COLUMN: text content (excluding spacers)
  if (columns[0]) {
    const leftCol = columns[0];
    const leftColContent = Array.from(leftCol.children)
      .filter((child) => !child.classList.contains('spacer'));
    if (leftColContent.length > 0) {
      cells.push(leftColContent);
    }
  }

  // RIGHT COLUMN: image content (if present)
  if (columns[1]) {
    const rightCol = columns[1];
    const imageSection = rightCol.querySelector('.image.section');
    if (imageSection) {
      const img = imageSection.querySelector('img');
      if (img) {
        cells.push([img]);
      }
    }
  }

  // Only create the content row if there is at least one non-empty cell
  if (cells.length > 0) {
    const rows = [
      headerRow,
      cells
    ];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
