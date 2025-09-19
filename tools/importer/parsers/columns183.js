/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Table header row per spec
  const headerRow = ['Columns (columns183)'];

  // Only keep columns that have meaningful .rich-text content (one per column, no duplicates)
  const meaningfulColumns = columns.map((col) => {
    const rich = col.querySelector('.rich-text');
    if (rich && rich.textContent.trim()) {
      // Clone the .rich-text node (deep clone)
      return rich.cloneNode(true);
    }
    return null;
  }).filter(Boolean);

  // Remove duplicate columns (by comparing text content)
  const uniqueColumns = [];
  const seen = new Set();
  meaningfulColumns.forEach(col => {
    const txt = col.textContent.trim();
    if (!seen.has(txt)) {
      seen.add(txt);
      uniqueColumns.push(col);
    }
  });

  if (!uniqueColumns.length) return;

  // Compose table data
  const tableData = [headerRow, uniqueColumns];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
