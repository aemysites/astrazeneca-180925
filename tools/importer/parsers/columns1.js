/* global WebImporter */
export default function parse(element, { document }) {
  // Collect the two columns
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));
  // Defensive: fallback if columns not found
  if (columns.length < 2) {
    element.replaceWith(document.createTextNode('ERROR: Columns block expects two columns.'));
    return;
  }
  const headerRow = ['Columns (columns1)'];

  // For each column, collect all its direct children (excluding empty spacers)
  const contentRow = columns.map((col) => {
    const children = Array.from(col.children);
    // Filter out empty spacers and empty text blocks
    const filtered = children.filter((child) => {
      if (child.classList.contains('spacer')) return false;
      if (child.classList.contains('text') && child.textContent.trim() === '') return false;
      return true;
    });
    // If only one non-empty child, use it directly
    if (filtered.length === 1) return filtered[0];
    // Otherwise, wrap in a fragment
    const frag = document.createDocumentFragment();
    filtered.forEach((el) => frag.appendChild(el));
    return frag;
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
