/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Only include columns with actual content
  const filteredCols = columns.map(col => {
    // Gather all meaningful child nodes (elements or non-empty text)
    return Array.from(col.childNodes).filter(node => {
      if (node.nodeType === 3) return node.textContent.trim(); // text node
      if (node.nodeType === 1) {
        // Must have visible content or contain meaningful elements
        if (node.textContent.trim()) return true;
        if (node.querySelector('img, blockquote, p, cite, span')) return true;
      }
      return false;
    });
  }).filter(nodes => nodes.length > 0); // Remove empty columns

  if (filteredCols.length < 2) return;

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns140)'];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    filteredCols
  ], document);

  element.replaceWith(table);
}
