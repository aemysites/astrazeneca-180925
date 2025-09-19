/* global WebImporter */
export default function parse(element, { document }) {
  // Get the three columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length !== 3) return;

  // Defensive: clear the element to ensure DOM modification
  element.innerHTML = '';

  // Column 1: Left stats
  let leftCell = null;
  const leftRich = columns[0].querySelector('.rich-text');
  if (leftRich) {
    leftCell = leftRich.cloneNode(true);
  } else {
    leftCell = columns[0].cloneNode(true);
  }

  // Column 2: Image
  let centerCell = null;
  const img = columns[1].querySelector('img');
  if (img) {
    centerCell = img.cloneNode(true);
  } else {
    centerCell = columns[1].cloneNode(true);
  }

  // Column 3: Right stats
  let rightCell = null;
  const rightRich = columns[2].querySelector('.rich-text');
  if (rightRich) {
    rightCell = rightRich.cloneNode(true);
  } else {
    rightCell = columns[2].cloneNode(true);
  }

  // Build table
  const headerRow = ['Columns (columns111)'];
  const contentRow = [leftCell, centerCell, rightCell];
  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
