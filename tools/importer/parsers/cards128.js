/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card info from a splitFeatureTile section
  function extractCard(cardSection) {
    // Image (mandatory)
    const img = cardSection.querySelector('img');

    // Title (mandatory, styled as heading)
    const titleDiv = cardSection.querySelector('.wscd-split-feature-tile__title');
    let title = null;
    if (titleDiv) {
      title = document.createElement('strong');
      title.textContent = titleDiv.textContent.trim();
    }

    // Description (optional)
    let desc = null;
    const descDiv = cardSection.querySelector('.rich-text p');
    if (descDiv) {
      desc = document.createElement('div');
      desc.textContent = descDiv.textContent.trim();
    }

    // Compose text cell content
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) {
      if (title) textCell.push(document.createElement('br'));
      textCell.push(desc);
    }

    return [img, textCell];
  }

  // Find all card columns (each card is in a .splitFeatureTile inside a parsys_column)
  const cardColumns = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [ ['Cards (cards128)'] ];

  cardColumns.forEach((col) => {
    const cardSection = col.querySelector('.splitFeatureTile');
    if (cardSection) {
      rows.push(extractCard(cardSection));
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
