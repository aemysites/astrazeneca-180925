/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column elements
  const columns = Array.from(element.children).filter(c => c.classList.contains('parsys_column'));
  if (columns.length < 2) return;

  // Column 1: collect all content nodes
  const col0Content = [];
  columns[0].childNodes.forEach((node) => {
    // Only reference element nodes, skip empty spacers
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Don't include empty spacers (e.g., only <hr>)
      if (node.classList.contains('spacer')) {
        // If the spacer contains only an <hr>, skip
        if (node.querySelectorAll('hr').length === node.childElementCount) return;
      }
      col0Content.push(node);
    }
  });

  // Column 2: collect all content nodes
  const col1Content = [];
  columns[1].childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Don't include empty spacers
      if (node.classList.contains('spacer')) {
        if (node.querySelectorAll('hr').length === node.childElementCount) return;
      }
      col1Content.push(node);
    }
  });

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns179)'];
  // Table content row: each column's content
  const contentRow = [col0Content, col1Content];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
