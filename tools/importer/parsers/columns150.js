/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column will be a cell in the second row
  const cells = columns.map((col) => {
    // Grab the first .rich-text inside each column, or fallback to the column itself
    const richText = col.querySelector('.rich-text');
    return richText ? richText : col;
  });

  // The header row must have exactly one column
  const rows = [
    ['Columns (columns150)'],
    [...cells], // second row: one cell per column, side by side
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
