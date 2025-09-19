/* global WebImporter */
export default function parse(element, { document }) {
  // Get the three columns (cards)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Always use target block name as header
  const headerRow = ['Cards (cards175)'];
  rows.push(headerRow);

  columns.forEach((col) => {
    // Get image element (reference, not clone)
    const img = col.querySelector('img');
    let textCell = '';
    // Gather all text content for the card (title and description)
    const richText = col.querySelector('.rich-text');
    if (richText) {
      const div = document.createElement('div');
      richText.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          div.appendChild(node.cloneNode(true));
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          div.appendChild(document.createTextNode(node.textContent.trim()));
        }
      });
      textCell = div;
    } else {
      // Fallback: use alt text if available
      textCell = img && img.alt ? document.createTextNode(img.alt) : document.createTextNode('');
    }
    // Only add the row if both image and textCell are present
    if (img && textCell) {
      rows.push([img, textCell]);
    }
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
