/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main column divs
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Left column: get all content (not just .jump-to)
  const leftCol = columns[0];
  // Use all children of leftCol to preserve structure and content
  const leftCellContent = Array.from(leftCol.childNodes).filter(node => {
    // Remove empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '');
  });

  // Right column: get all content except spacers
  const rightCol = columns[1];
  const rightClone = rightCol.cloneNode(true);
  // Remove spacers
  Array.from(rightClone.querySelectorAll('.spacer')).forEach(el => el.remove());
  // Use all children of rightClone to preserve structure and content
  const rightCellContent = Array.from(rightClone.childNodes).filter(node => {
    return !(node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '');
  });

  // Only include non-empty columns
  const leftHasContent = leftCellContent.some(node => (node.textContent && node.textContent.trim()) || node.nodeType !== Node.TEXT_NODE);
  const rightHasContent = rightCellContent.some(node => (node.textContent && node.textContent.trim()) || node.nodeType !== Node.TEXT_NODE);
  if (!leftHasContent && !rightHasContent) return;

  const cells = [];
  if (leftHasContent) cells.push(leftCellContent);
  if (rightHasContent) cells.push(rightCellContent);

  const headerRow = ['Columns (columns136)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
