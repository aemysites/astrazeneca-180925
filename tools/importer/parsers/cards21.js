/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container
  const panel = element.querySelector('.icon-link-panel__wrapper');
  if (!panel) return;

  // Get all card elements
  const cards = Array.from(panel.children).filter((child) => child.classList.contains('icon-link-panel__link'));

  // Prepare table rows
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards21)']);

  // For each card, extract image and text content
  cards.forEach((card) => {
    // Image/Icon (first cell)
    const imgWrapper = card.querySelector('.icon-link-panel__image-wrapper');
    let image = null;
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) image = img;
    }

    // Text content (second cell)
    // Title
    let title = card.querySelector('h3');
    // Description (the first <p> after <h3>)
    let desc = null;
    const ps = card.querySelectorAll('p');
    if (ps.length > 0) {
      desc = ps[0];
    }

    // Compose text cell: title (as heading) + description
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    rows.push([
      image || '',
      textCell
    ]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
