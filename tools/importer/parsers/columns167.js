/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Only keep columns that have meaningful content
  const meaningfulColumns = columns.filter(col => {
    // Remove columns that are empty or only whitespace
    const text = col.textContent.replace(/\u00a0/g, '').trim();
    // Also check for presence of any non-empty element
    return (text.length > 0 || col.querySelector('a, ul, h3, p, article'));
  });
  // If less than 2 meaningful columns, do not create a columns block
  if (meaningfulColumns.length < 2) return;

  // The header row must have the same number of columns as the content row, with the block name in the first cell and empty strings in the rest
  const headerRow = ['Columns (columns167)', ...Array(meaningfulColumns.length - 1).fill('')];
  const contentRow = meaningfulColumns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
