/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns188)'];

  // Get immediate child columns
  const columns = element.querySelectorAll(':scope > div');

  // Helper to get meaningful content from a column (ignore spacers and <hr>)
  function getColumnContent(col) {
    if (!col) return null;
    const filtered = Array.from(col.children).filter(child => {
      if (child.classList.contains('spacer')) return false;
      if (child.tagName === 'HR') return false;
      return true;
    });
    if (filtered.length === 0) return null;
    return filtered.length === 1 ? filtered[0] : filtered;
  }

  const leftContent = getColumnContent(columns[0]);
  const rightContent = getColumnContent(columns[1]);

  // Only include columns with actual content (no empty or <hr> only columns)
  const row = [];
  if (leftContent) row.push(leftContent);
  if (rightContent) row.push(rightContent);

  const tableRows = [headerRow, row];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
