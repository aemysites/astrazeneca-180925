/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate column children
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  const headerRow = ['Columns (columns104)'];

  // Only include columns that have at least one non-spacer child
  const contentRow = [];
  columns.forEach((col) => {
    const colContent = [];
    col.querySelectorAll(':scope > div').forEach((child) => {
      if (!child.classList.contains('spacer')) {
        colContent.push(child);
      }
    });
    // Only add the column if it has content
    if (colContent.length > 0) {
      contentRow.push(colContent);
    }
  });

  // Only create the table if there are at least two columns with content
  if (contentRow.length < 2) return;

  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
