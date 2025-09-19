/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the best background image
  function getBackgroundImage(el) {
    // Try to find the largest img in the element
    const imgs = Array.from(el.querySelectorAll('img'));
    if (!imgs.length) return null;
    // Prefer images with largest width attribute, fallback to first
    let bestImg = imgs[0];
    for (const img of imgs) {
      const width = parseInt(img.getAttribute('width'), 10);
      if (width && (!bestImg.getAttribute('width') || width > parseInt(bestImg.getAttribute('width'), 10))) {
        bestImg = img;
      }
    }
    return bestImg;
  }

  // Extract background image
  const backgroundImg = getBackgroundImage(element);

  // Extract headline and subheading
  let titleEl = null;
  let subheadingEl = null;
  // Find the rich-header__content block
  const contentBlock = element.querySelector('.rich-header__content');
  if (contentBlock) {
    // Title
    titleEl = contentBlock.querySelector('.rich-header__title');
    // Subheading
    subheadingEl = contentBlock.querySelector('.rich-header__strapline');
  }

  // Compose text cell
  const textCellContent = [];
  if (titleEl) textCellContent.push(titleEl);
  if (subheadingEl) textCellContent.push(subheadingEl);

  // Compose table rows
  const headerRow = ['Hero (hero200)'];
  const imageRow = [backgroundImg ? backgroundImg : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Build the table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
