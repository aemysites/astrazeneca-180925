/* global WebImporter */
export default function parse(element, { document }) {
  // Get top-level columns
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));
  if (!columns.length) return;

  // Header row must match block name exactly
  const headerRow = ['Columns (columns158)'];

  // For each column, extract all direct children (preserving order and semantics)
  const contentRow = columns.map((col) => {
    // Gather all direct children except script/style
    const colContent = [];
    Array.from(col.children).forEach((child) => {
      if (child.tagName && ['SCRIPT', 'STYLE'].includes(child.tagName)) return;
      // Reference existing elements, do not clone
      colContent.push(child);
    });
    // If only one element, return it directly
    if (colContent.length === 1) return colContent[0];
    // If multiple elements, return array
    if (colContent.length > 1) return colContent;
    // If empty, return empty string
    return '';
  });

  // Create the table with block header and content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
