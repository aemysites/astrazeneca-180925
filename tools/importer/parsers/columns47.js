/* global WebImporter */
export default function parse(element, { document }) {
  // Only select direct children that are actual columns (not empty or whitespace nodes)
  const columns = Array.from(element.children);

  // Only proceed if we have at least one column
  if (!columns.length) return;

  // Table header row (block name)
  const headerRow = ['Columns (columns47)'];

  // Second row: Each column's main content (no empty columns)
  const contentRow = columns.map((col) => {
    // Find the .rich-text container in each column, else fallback to the column itself
    const richText = col.querySelector('.rich-text') || col;
    return richText;
  });

  // Compose the table rows (no empty columns)
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
