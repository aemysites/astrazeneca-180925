/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns inside the main wrapper
  const columns = Array.from(
    element.querySelectorAll(':scope > .wrapperPar > .parsys_column.l-two-block--offset-right > .parsys_column')
  );

  // Defensive: must have exactly two columns
  if (columns.length !== 2) return;

  // LEFT COLUMN: collect all content (not just jumpTo)
  const leftCol = columns[0];
  // Clone to avoid moving elements out of the DOM
  const leftContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach(node => {
    leftContent.appendChild(node.cloneNode(true));
  });

  // RIGHT COLUMN: collect all content (not just text/image)
  const rightCol = columns[1];
  const rightContent = document.createElement('div');
  Array.from(rightCol.childNodes).forEach(node => {
    rightContent.appendChild(node.cloneNode(true));
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns87)'];
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
