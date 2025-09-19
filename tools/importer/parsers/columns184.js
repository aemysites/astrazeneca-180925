/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // LEFT COLUMN: collect all non-spacer sections
  const leftCol = columns[0];
  const leftContent = [];
  leftCol.childNodes.forEach((child) => {
    if (child.nodeType === 1 && !child.classList.contains('spacer')) {
      leftContent.push(child);
    }
  });

  // RIGHT COLUMN: collect all non-spacer sections (not just image)
  const rightCol = columns[1];
  const rightContent = [];
  rightCol.childNodes.forEach((child) => {
    if (child.nodeType === 1 && !child.classList.contains('spacer')) {
      rightContent.push(child);
    }
  });

  // Always output two columns for this layout
  const row = [leftContent, rightContent];

  const headerRow = ['Columns (columns184)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
