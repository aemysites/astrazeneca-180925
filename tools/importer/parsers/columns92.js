/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only include columns that have meaningful (non-empty) text content
  const meaningfulColumns = columns
    .filter(col => col.textContent && col.textContent.trim().length > 0)
    .map(col => Array.from(col.childNodes));

  if (meaningfulColumns.length === 0) return;

  const headerRow = ['Columns (columns92)'];
  const columnsRow = meaningfulColumns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
