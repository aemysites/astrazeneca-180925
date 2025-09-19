/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return; // Defensive: need at least 2 columns

  // --- Column 1: Left ---
  const leftCol = columns[0];
  // Gather all relevant children except spacers
  const leftContent = [];
  leftCol.childNodes.forEach((child) => {
    // Only add non-spacer sections
    if (child.nodeType === 1 && !child.classList.contains('spacer')) {
      leftContent.push(child);
    }
  });

  // --- Column 2: Right ---
  const rightCol = columns[1];
  const rightContent = [];
  rightCol.childNodes.forEach((child) => {
    if (child.nodeType === 1 && !child.classList.contains('spacer')) {
      rightContent.push(child);
    }
  });

  // Table rows
  const headerRow = ['Columns (columns145)'];
  const contentRow = [leftContent, rightContent];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
