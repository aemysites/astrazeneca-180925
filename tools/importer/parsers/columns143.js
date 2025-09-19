/* global WebImporter */
export default function parse(element, { document }) {
  // Only use columns with actual content (images) -- no empty columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Extract only columns that contain an image
  const colCells = columns
    .map(col => col.querySelector('img'))
    .filter(img => img);

  if (colCells.length === 0) return;

  const headerRow = ['Columns (columns143)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    colCells,
  ], document);

  element.replaceWith(table);
}
