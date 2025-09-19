/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // First column: text content
  let textCell = null;
  const textCol = columns[0];
  textCell = textCol.querySelector('.rich-text') || textCol.querySelector('.text') || textCol;
  let textCellContent = textCell && textCell.textContent.trim() ? textCell : null;

  // Second column: image content
  let imageCell = null;
  const imgCol = columns[1];
  const imgEl = imgCol.querySelector('img');
  imageCell = imgEl ? imgEl : null;

  // Only include columns that have actual content
  const contentRow = [];
  if (textCellContent) contentRow.push(textCellContent);
  if (imageCell) contentRow.push(imageCell);
  if (contentRow.length === 0) return;

  const headerRow = ['Columns (columns124)'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
