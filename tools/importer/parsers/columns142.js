/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns wrapper
  const wrapperPar = element.querySelector('.wrapperPar');
  if (!wrapperPar) return;

  // Find the two column blocks
  const columns = Array.from(wrapperPar.children).filter(el => el.classList.contains('parsys_column'));
  if (columns.length < 2) return;

  // Left column: jump to section menu
  const leftCol = columns[0];
  // Right column: text + image/video
  const rightCol = columns[1];

  // --- Left column content ---
  // Find the jump to section block
  let leftContent = leftCol.querySelector('.jumpTo');
  if (!leftContent) leftContent = leftCol;

  // --- Right column content ---
  // Find the rich text block
  const textSection = rightCol.querySelector('.rich-text');
  // Find the image block
  const imageSection = rightCol.querySelector('.responsive-image');

  // Compose right column cell
  const rightCellContent = [];
  if (textSection) rightCellContent.push(textSection);
  if (imageSection) rightCellContent.push(imageSection);

  // --- Table Construction ---
  const headerRow = ['Columns (columns142)'];
  const contentRow = [leftContent, rightCellContent.length === 1 ? rightCellContent[0] : rightCellContent];

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  if (block && block !== element) {
    element.replaceWith(block);
  }
}
