/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each .show-more-wrapper__item
  function extractCard(item) {
    // Find image (mandatory)
    const img = item.querySelector('img');
    // Find title (mandatory)
    const title = item.querySelector('.content-tile__title');
    // Find date (optional, used as description)
    const date = item.querySelector('.content-tile__date');
    // Find link (optional, used as CTA)
    const link = item.querySelector('a.content-tile');
    // Compose text cell
    const textCell = document.createElement('div');
    // Title as heading
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      textCell.appendChild(h3);
    }
    // Date as description
    if (date) {
      const p = document.createElement('p');
      p.textContent = date.textContent.trim();
      textCell.appendChild(p);
    }
    // Add all other text content from content-tile__content-wrapper except title and date
    const contentWrapper = item.querySelector('.content-tile__content-wrapper');
    if (contentWrapper) {
      Array.from(contentWrapper.childNodes).forEach((node) => {
        if (
          node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
        ) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textCell.appendChild(p);
        }
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          !node.classList.contains('content-tile__title') &&
          !node.classList.contains('content-tile__date')
        ) {
          // If it's not title or date, add its text
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          if (p.textContent) textCell.appendChild(p);
        }
      });
    }
    // CTA as link (if present)
    if (link && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = 'Read more';
      textCell.appendChild(a);
    }
    return [img, textCell];
  }

  // Get all cards
  const items = Array.from(element.querySelectorAll(':scope > .show-more-wrapper__item'));
  const rows = items.map(extractCard);

  // Build table
  const headerRow = ['Cards (cards67)'];
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace element
  element.replaceWith(table);
}
