/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // --- COLUMN 1: QUOTE ---
  const col0 = columns[0];
  let quoteSection = col0.querySelector('.quote.section');
  let quoteCell = null;
  if (quoteSection) {
    // Reference the blockquote (including author and title)
    const blockquote = quoteSection.querySelector('blockquote');
    if (blockquote) {
      quoteCell = document.createElement('div');
      quoteCell.appendChild(blockquote.cloneNode(true));
    }
  }

  // --- COLUMN 2: IMAGE ---
  const col1 = columns[1];
  let imageSection = col1.querySelector('.image.section');
  let imageCell = null;
  if (imageSection) {
    // Reference the <img> directly
    const img = imageSection.querySelector('img');
    if (img) {
      imageCell = document.createElement('div');
      imageCell.appendChild(img.cloneNode(true));
    }
  }

  // Only include non-empty cells
  const cells = [];
  if (quoteCell) cells.push(quoteCell);
  if (imageCell) cells.push(imageCell);
  if (cells.length === 0) return;

  const headerRow = ['Columns (columns95)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
