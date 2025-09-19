/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns (columns130)'];

  // Only select columns that actually contain content
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Only include columns that have non-empty .textActionFlexibleBlock.section
  const contentCells = [];
  columns.forEach(col => {
    const block = col.querySelector('.textActionFlexibleBlock.section');
    if (block && block.textContent.trim()) {
      contentCells.push(block);
    } else if (!block && col.textContent.trim()) {
      contentCells.push(col);
    }
    // If no content, do not add anything (no empty cell)
  });

  // Compose the table rows: header and one row with only populated columns
  const tableRows = [headerRow, contentCells.length ? contentCells : ['']];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
