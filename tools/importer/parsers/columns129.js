/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct column elements
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));
  // Defensive fallback if columns not found
  const colEls = columns.length ? columns : Array.from(element.children);

  // For each column, extract its direct content (preserve semantic structure)
  const contentRow = colEls.map((col) => {
    // If column has only one child, use it directly
    const children = Array.from(col.children);
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      // Wrap multiple children in a fragment
      const frag = document.createDocumentFragment();
      children.forEach((child) => frag.appendChild(child));
      return frag;
    } else {
      // Empty column
      return '';
    }
  });

  // Compose the table rows
  const headerRow = ['Columns (columns129)'];
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
