/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two-column wrapper
  const columnWrapper = element.querySelector('.parsys_column.l-two-block--padded');
  if (!columnWrapper) return;

  // Get all direct column children (should be 2)
  const columnEls = Array.from(columnWrapper.querySelectorAll(':scope > .parsys_column'));
  if (columnEls.length === 0) return;

  // For each column, extract the main block content (the article)
  const columns = columnEls.map(col => {
    // Find the article inside this column
    const article = col.querySelector('article');
    // Defensive: If not found, fallback to column itself
    return article || col;
  });

  // Build the table
  const headerRow = ['Columns (columns171)'];
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
