/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main accordion items container
  const itemsContainer = element.querySelector('.accordionItems');
  if (!itemsContainer) return;

  // Get all immediate accordion item sections
  const itemSections = Array.from(itemsContainer.querySelectorAll(':scope > section.accordion__item'));

  // Build the table rows
  const rows = [];
  // Header row as required
  rows.push(['Accordion (accordion180)']);

  itemSections.forEach((section) => {
    // Find the header/title element
    const header = section.querySelector('.accordion__header');
    // Defensive: get the actual title text span, fallback to header textContent
    let titleCell;
    const titleSpan = header && header.querySelector('span:last-of-type');
    if (titleSpan) {
      titleCell = titleSpan;
    } else if (header) {
      titleCell = document.createTextNode(header.textContent.trim());
    } else {
      titleCell = document.createTextNode('');
    }

    // Find the content element
    const content = section.querySelector('.accordion__content');
    // Defensive: grab all children of the content div (usually one parsys)
    let contentCell;
    if (content) {
      // Use all direct children of the content div
      const contentChildren = Array.from(content.children);
      // If only one child, use it directly, else use array
      if (contentChildren.length === 1) {
        contentCell = contentChildren[0];
      } else if (contentChildren.length > 1) {
        contentCell = contentChildren;
      } else {
        contentCell = document.createTextNode(content.textContent.trim());
      }
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
