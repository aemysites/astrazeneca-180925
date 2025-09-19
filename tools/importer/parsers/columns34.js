/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns34)'];

  // If the element is empty, always output a block with a single empty cell
  if (!element || !element.innerHTML.trim()) {
    const cells = [headerRow, ['']];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // For maximum flexibility, collect all direct children, but if none, use all text content
  let children = Array.from(element.children).filter(el => el.textContent.trim() || el.querySelector('img, ul, ol, a'));

  // If no children, fallback to all text content as a single column
  if (children.length === 0) {
    const text = element.textContent.trim();
    const cells = [headerRow, [text ? text : '']];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Split children into 3 columns as evenly as possible
  const numCols = 3;
  const colSize = Math.ceil(children.length / numCols);
  const columns = [];
  for (let i = 0; i < numCols; i++) {
    const colChildren = children.slice(i * colSize, (i + 1) * colSize);
    if (colChildren.length === 1) {
      columns.push(colChildren[0]);
    } else if (colChildren.length > 1) {
      columns.push(colChildren);
    } else {
      columns.push('');
    }
  }

  // If all columns are empty, output a block with a single empty cell
  if (columns.every(col => !col || (Array.isArray(col) && col.length === 0))) {
    const cells = [headerRow, ['']];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  const cells = [headerRow, columns];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
