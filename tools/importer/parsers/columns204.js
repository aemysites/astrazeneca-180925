/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.children).filter((col) => col.classList.contains('parsys_column'));
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // Find image block (should be first child)
  let leftImage = null;
  const imageSection = leftCol.querySelector('.image.section .responsive-image');
  if (imageSection) {
    const img = imageSection.querySelector('img');
    if (img) leftImage = img;
  }

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  // Find rich text block
  let rightText = null;
  const textSection = rightCol.querySelector('.text.parbase.section .rich-text');
  if (textSection) rightText = textSection;
  // Find button block
  let rightButton = null;
  const buttonSection = rightCol.querySelector('.callToAction.section .button--center');
  if (buttonSection) rightButton = buttonSection;

  // Compose right cell content
  const rightCell = document.createElement('div');
  if (rightText) rightCell.appendChild(rightText);
  if (rightButton) rightCell.appendChild(rightButton);

  // Compose left cell content
  const leftCell = document.createElement('div');
  if (leftImage) leftCell.appendChild(leftImage);

  // Table header
  const headerRow = ['Columns (columns204)'];
  // Table content row
  const contentRow = [leftCell, rightCell];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
