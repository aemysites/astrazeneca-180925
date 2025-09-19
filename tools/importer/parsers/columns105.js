/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns (columns105)'];

  // Get immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only keep columns with meaningful content (not empty, not just <hr>, not just empty <div>s)
  const meaningfulColumns = columns.map((col) => {
    // Gather all direct children that are meaningful
    const children = Array.from(col.children).filter((child) => {
      // Remove <hr> and empty divs
      if (child.tagName === 'HR') return false;
      if (child.tagName === 'DIV' && child.textContent.trim() === '' && child.children.length === 0) return false;
      return true;
    });
    // If there are meaningful children, use them
    const filtered = children.filter((c) => {
      // Only keep if not an empty div
      if (c.tagName === 'DIV' && c.textContent.trim() === '' && c.children.length === 0) return false;
      return true;
    });
    if (filtered.length > 0) {
      if (filtered.length === 1) return filtered[0];
      return filtered;
    }
    // If no meaningful children, check if the column itself has text
    if (col.textContent.trim()) {
      return col.textContent.trim();
    }
    // Otherwise, skip this column
    return null;
  }).filter((col) => {
    // Remove columns that are just empty divs or null
    if (!col) return false;
    if (typeof col === 'string') return col.trim() !== '';
    if (Array.isArray(col)) return col.length > 0 && col.some((item) => {
      if (typeof item === 'string') return item.trim() !== '';
      if (item.tagName === 'DIV' && item.textContent.trim() === '' && item.children.length === 0) return false;
      return true;
    });
    if (col.tagName === 'DIV' && col.textContent.trim() === '' && col.children.length === 0) return false;
    return true;
  });

  // Defensive: Only proceed if at least 2 columns
  if (meaningfulColumns.length < 2) {
    // fallback: replace with block name only
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [''],
    ], document);
    element.replaceWith(table);
    return;
  }

  // Build the table rows
  const tableRows = [
    headerRow,
    meaningfulColumns,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
