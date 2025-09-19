/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card elements
  const cards = Array.from(
    element.querySelectorAll(':scope .icon-link-panel__link')
  );

  // Table header row as required
  const headerRow = ['Cards (cards110)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Get image (reference the existing element)
    const imgWrapper = card.querySelector('.icon-link-panel__image-wrapper');
    let img = '';
    if (imgWrapper) {
      const foundImg = imgWrapper.querySelector('img');
      if (foundImg) img = foundImg;
    }

    // Get heading (reference the existing element)
    let heading = '';
    const h3 = card.querySelector('h3');
    if (h3) heading = h3;

    // Get description (reference the existing element)
    let desc = '';
    // Only select the first <p> that is a sibling of the heading
    const p = card.querySelector('p');
    if (p) desc = p;

    // Compose text cell: heading (bold) + description (normal)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);

    rows.push([
      img,
      textCell
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
