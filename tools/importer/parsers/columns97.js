/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Left column: aggregate all children (text, hr, button)
  const leftColNodes = [];
  columns[0].childNodes.forEach((node) => {
    // Only reference existing elements, do not clone
    if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
      leftColNodes.push(node);
    }
  });

  // Right column: aggregate all children (image)
  const rightColNodes = [];
  columns[1].childNodes.forEach((node) => {
    if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
      rightColNodes.push(node);
    }
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns97)'];

  // Table content row: each cell is an array of referenced nodes
  const contentRow = [leftColNodes, rightColNodes];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
