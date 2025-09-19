/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns199)'];

  // Get the two column divs directly under the block
  const columns = Array.from(element.children).filter(child => child.classList.contains('parsys_column'));

  // Defensive: fallback to single cell if not two columns
  if (columns.length !== 2) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [element]
    ], document);
    element.replaceWith(table);
    return;
  }

  // For each column, collect all direct children as a single cell
  function collectCellContent(col) {
    // If only one child, use it directly
    const children = Array.from(col.children);
    if (children.length === 1) return children[0];
    // Otherwise, wrap in a fragment
    const frag = document.createDocumentFragment();
    children.forEach(child => frag.appendChild(child.cloneNode(true)));
    return frag;
  }

  const leftCell = collectCellContent(columns[0]);
  const rightCell = collectCellContent(columns[1]);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCell, rightCell]
  ], document);

  element.replaceWith(table);
}
