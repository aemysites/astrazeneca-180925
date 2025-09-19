/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row (EXACTLY one column)
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Find all cards
  const wrapper = element.querySelector('.icon-link-panel__wrapper');
  if (wrapper) {
    const cards = wrapper.querySelectorAll('.icon-link-panel__link');
    cards.forEach((card) => {
      // Image
      const imgWrapper = card.querySelector('.icon-link-panel__image-wrapper');
      const img = imgWrapper ? imgWrapper.querySelector('img') : null;
      // Text
      const title = card.querySelector('.icon-link-panel__image-title');
      let textCell = '';
      if (title) {
        // Use <em> for visual match
        const em = document.createElement('em');
        em.textContent = title.textContent;
        textCell = em;
      }
      rows.push([img, textCell]);
    });
  }

  // Create table with header row as a single column ONLY
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
