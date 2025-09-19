/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if there are at least two columns
  const columns = Array.from(element.children);
  if (columns.length < 2) return;

  // Block header row as required
  const headerRow = ['Columns (columns198)'];

  // For each column, extract all non-spacer content blocks
  const contentRow = columns.map((col) => {
    // Only keep children that are not spacers
    const blocks = Array.from(col.children).filter((child) => {
      return !child.classList.contains('spacer');
    });
    // If only one block, return it directly
    if (blocks.length === 1) return blocks[0];
    // If multiple, return as array
    return blocks;
  });

  // Create the table with header and content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
