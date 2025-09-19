/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct column children
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));
  if (!columns.length) return;

  // Required header row
  const headerRow = ['Columns (columns170)'];

  // Each cell: use the .rich-text content if present
  const contentRow = columns.map((col) => {
    const richText = col.querySelector('.rich-text');
    // Defensive: if richText exists, use it; else use column itself
    return richText ? richText : col;
  });

  // Create table with header and content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the element with the table
  element.replaceWith(table);
}
