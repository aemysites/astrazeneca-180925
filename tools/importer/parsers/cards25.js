/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container
  const itemsWrapper = element.querySelector('.show-more-wrapper__items');
  if (!itemsWrapper) return;
  const cardDivs = Array.from(itemsWrapper.querySelectorAll(':scope > .show-more-wrapper__item'));

  // Table header row
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  cardDivs.forEach(cardDiv => {
    // Find the anchor that wraps the card
    const anchor = cardDiv.querySelector('a.content-tile');
    if (!anchor) return;

    // --- IMAGE CELL ---
    // Reference the existing image element
    const img = anchor.querySelector('img');
    const imageCell = img || '';

    // --- TEXT CELL ---
    // Title
    const titleDiv = anchor.querySelector('.content-tile__title');
    let titleEl = null;
    if (titleDiv) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleDiv.textContent.trim();
    }

    // Date (as description)
    const dateEl = anchor.querySelector('time');
    let dateText = '';
    if (dateEl) {
      dateText = dateEl.textContent.trim();
    }

    // Compose text cell content: more flexible, include all text content
    const textCellContent = [];
    if (titleEl) {
      textCellContent.push(titleEl);
    }
    // Collect all text nodes (excluding title and date) for description
    const contentWrapper = anchor.querySelector('.content-tile__content-wrapper');
    if (contentWrapper) {
      // Skip title and date, get other text if present
      Array.from(contentWrapper.childNodes).forEach(node => {
        if (
          node !== titleDiv &&
          node !== dateEl &&
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim().length > 0
        ) {
          textCellContent.push(document.createElement('br'));
          textCellContent.push(document.createTextNode(node.textContent.trim()));
        }
      });
    }
    if (dateText) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(document.createTextNode(dateText));
    }
    // Optionally, add link as CTA at the bottom
    if (anchor.href) {
      textCellContent.push(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = anchor.href;
      cta.textContent = 'Read more';
      textCellContent.push(cta);
    }

    // Ensure all text content is included (fallback: use all text from content wrapper if above is empty)
    if (textCellContent.length === 0 && contentWrapper) {
      textCellContent.push(contentWrapper.textContent.trim());
    }

    rows.push([imageCell, textCellContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
