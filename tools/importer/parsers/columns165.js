/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.children)
    .filter((col) => col.classList.contains('parsys_column'));

  // Defensive: expect two columns for this layout
  const col1 = columns[0];
  const col2 = columns[1];

  // Helper: extract meaningful content from a column
  function extractColumnContent(col) {
    if (!col) return '';
    // Only include non-empty, non-spacer children
    const nodes = Array.from(col.children).filter((node) => {
      if (node.classList.contains('spacer')) return false;
      if (node.textContent.trim() === '' && !node.querySelector('img,a')) return false;
      return true;
    });
    // If only one node, use it directly
    if (nodes.length === 1) return nodes[0];
    // If multiple, wrap in a div for grouping
    if (nodes.length > 1) {
      const wrapper = document.createElement('div');
      nodes.forEach((n) => wrapper.appendChild(n));
      return wrapper;
    }
    return '';
  }

  const col1Content = extractColumnContent(col1);
  const col2Content = extractColumnContent(col2);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns165)'];
  const contentRow = [col1Content, col2Content];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
