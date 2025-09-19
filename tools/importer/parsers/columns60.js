/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList && el.classList.contains(className));
  }

  // Find the two column containers
  const parsysColumn = element.querySelector('.parsys_column.l-two-block--padded');
  if (!parsysColumn) return;
  const columns = parsysColumn.querySelectorAll(':scope > .parsys_column');
  if (columns.length < 2) return;

  // LEFT COLUMN: text content
  const leftCol = columns[0];
  // Find all .text.parbase.section blocks (skip spacers)
  const textBlocks = Array.from(leftCol.querySelectorAll(':scope > .text.parbase.section'));
  // Collect their .rich-text children
  const leftContent = textBlocks.map(tb => getDirectChildByClass(tb, 'rich-text')).filter(Boolean);

  // RIGHT COLUMN: image content
  const rightCol = columns[1];
  // Find the image section
  const imageSection = getDirectChildByClass(rightCol, 'image');
  let imgEl = null;
  if (imageSection) {
    const responsiveImage = getDirectChildByClass(imageSection, 'responsive-image');
    if (responsiveImage) {
      imgEl = responsiveImage.querySelector('img');
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns60)'];
  const contentRow = [
    leftContent, // left column: array of rich-text divs
    imgEl ? [imgEl] : '', // right column: image element if present
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
