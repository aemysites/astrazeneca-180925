/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate children of type
  function getImmediateChildrenByTag(parent, tagName) {
    return Array.from(parent.children).filter(child => child.tagName === tagName);
  }

  // 1. Header row
  const headerRow = ['Columns (columns55)'];

  // 2. Find all headings and panels for columns
  // The structure is: p.heading, div.panel, p.heading, div.panel, ...
  // We want to pair each heading with its panel, and create a column for each
  const headings = Array.from(element.querySelectorAll(':scope > p.dual-tabs__heading'));
  const panels = Array.from(element.querySelectorAll(':scope > div.dual-tabs__panel'));

  // Defensive: ensure headings and panels match
  const numColumns = Math.min(headings.length, panels.length);

  // 3. Build the first content row: each cell is a column (heading + panel)
  const firstContentRow = [];
  for (let i = 0; i < numColumns; i++) {
    // Each cell: heading + panel
    const cellContent = [headings[i], panels[i]];
    firstContentRow.push(cellContent);
  }

  // 4. Build the table
  const cells = [headerRow, firstContentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
