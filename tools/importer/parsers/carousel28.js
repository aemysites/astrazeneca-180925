/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(child => child.matches(selector));
  }

  // Header row as required
  const headerRow = ['Carousel (carousel28)'];

  // Defensive: find the anchor (slide container)
  const anchor = getDirectChild(element, 'a');
  if (!anchor) return;

  // Get image: find .content-tile__header > figure > .responsive-image > img
  let imageEl = null;
  const headerDiv = getDirectChild(anchor, '.content-tile__header');
  if (headerDiv) {
    const figure = getDirectChild(headerDiv, 'figure');
    if (figure) {
      const responsiveImage = getDirectChild(figure, '.responsive-image');
      if (responsiveImage) {
        imageEl = responsiveImage.querySelector('img');
      }
    }
  }

  // Get text content: title
  let textContent = null;
  const contentWrapper = getDirectChild(anchor, '.content-tile__content-wrapper');
  if (contentWrapper) {
    const titleDiv = getDirectChild(contentWrapper, '.content-tile__title');
    if (titleDiv) {
      // Create heading element for title
      const heading = document.createElement('h2');
      heading.textContent = titleDiv.textContent.trim();
      textContent = heading;
    }
  }

  // Build slide row: image in first cell, text in second cell (if present)
  const slideRow = [imageEl || '', textContent ? [textContent] : ''];

  // Build table rows
  const rows = [headerRow, slideRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
