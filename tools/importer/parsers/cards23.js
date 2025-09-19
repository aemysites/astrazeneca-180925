/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a splitFeatureTile section
  function extractCard(cardSection) {
    // Find image
    const img = cardSection.querySelector('img');
    // Find title
    const titleDiv = cardSection.querySelector('.wscd-split-feature-tile__title');
    let title = '';
    if (titleDiv) {
      title = titleDiv.textContent.trim();
    }
    // Find description
    const descDiv = cardSection.querySelector('.rich-text p');
    let desc = '';
    if (descDiv) {
      desc = descDiv.textContent.trim();
    }
    // Compose text cell as a single block (title in <strong>, then description)
    const textCell = document.createElement('div');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      textCell.appendChild(strong);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      textCell.appendChild(p);
    }
    return [img, textCell];
  }

  // Find all card sections
  const cards = [];
  // Defensive: get all immediate splitFeatureTile sections
  const cardSections = element.querySelectorAll('.splitFeatureTile.section');
  cardSections.forEach((cardSection) => {
    cards.push(extractCard(cardSection));
  });

  // Table header (must be a single cell)
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow];
  // Add each card as a row (each row is a 2-cell array)
  cards.forEach((card) => {
    tableRows.push(card);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
