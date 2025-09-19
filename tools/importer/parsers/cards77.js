/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first image inside a column
  function extractImage(col) {
    const img = col.querySelector('img');
    return img || '';
  }

  // Helper to extract accordion title and description as a single cell
  function extractAccordionText(col) {
    const section = col.querySelector('.accordion__item');
    if (!section) return '';
    const h3 = section.querySelector('h3');
    let title = '';
    if (h3) {
      const h3Clone = h3.cloneNode(true);
      const icon = h3Clone.querySelector('span.ui-accordion-header-icon');
      if (icon) icon.remove();
      title = h3Clone.textContent.trim();
    }
    const desc = section.querySelector('.accordion__content .rich-text');
    let descNodes = [];
    if (desc) {
      descNodes = Array.from(desc.childNodes);
    }
    const cellContent = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      cellContent.push(strong);
    }
    if (descNodes.length > 0) {
      if (title) cellContent.push(document.createElement('br'));
      cellContent.push(...descNodes);
    }
    return cellContent.length ? cellContent : '';
  }

  // Get the two card columns
  const columns = element.querySelectorAll(':scope > div');
  const rows = [];
  // Header row: single column
  rows.push(['Cards (cards77)']);

  // Each card is a single row with two columns: [image, text]
  columns.forEach((col) => {
    const img = extractImage(col);
    const textContent = extractAccordionText(col);
    // Only add a card row if both image and text are present
    if (img && textContent) {
      rows.push([img, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
