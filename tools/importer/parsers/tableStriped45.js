/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first table in the element
  const table = element.querySelector('table');
  if (!table) return;

  // Extract body rows from tbody
  const tbody = table.querySelector('tbody');
  const rows = [];
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach((tr) => {
      const cells = [];
      const tds = tr.querySelectorAll('td');
      tds.forEach((td) => {
        // Prefer span.tablesaw-cell-content > p
        const contentSpan = td.querySelector('.tablesaw-cell-content');
        if (contentSpan) {
          const p = contentSpan.querySelector('p');
          if (p) {
            cells.push(p);
          } else {
            cells.push(contentSpan);
          }
        } else {
          // Fallback: use all children if present, else text
          if (td.children.length) {
            cells.push(Array.from(td.children));
          } else {
            cells.push(td.textContent.trim());
          }
        }
      });
      rows.push(cells);
    });
  }

  // Compose block rows: only the block name header, then data rows
  const blockRows = [];
  blockRows.push(['Table (striped, tableStriped45)']); // Block name as header
  rows.forEach((row) => blockRows.push(row)); // Data rows only

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace the original element
  element.replaceWith(block);
}
