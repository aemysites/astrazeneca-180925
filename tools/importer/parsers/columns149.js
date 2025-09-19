/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Extract quote block from left column
  let quoteBlock = leftCol.querySelector('.quote.section');
  if (!quoteBlock) quoteBlock = leftCol;

  // Extract image block from right column
  let imageBlock = rightCol.querySelector('.image.section');
  if (!imageBlock) imageBlock = rightCol;

  // Compose table rows, only include columns with actual content (no empty columns)
  const cells = [];
  if (quoteBlock && quoteBlock.textContent.trim()) {
    cells.push(quoteBlock);
  }
  if (imageBlock && (imageBlock.textContent.trim() || imageBlock.querySelector('img'))) {
    cells.push(imageBlock);
  }

  // Table header
  const headerRow = ['Columns (columns149)'];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
