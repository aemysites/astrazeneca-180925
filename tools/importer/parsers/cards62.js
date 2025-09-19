/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards62)'];
  const rows = [headerRow];

  // Get all direct <a> children (each card)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Find image (icon)
    const img = card.querySelector('img');
    // Find title
    const title = card.querySelector('.icon-link-panel__image-title');
    // Compose text cell: title as heading only
    let textCellContent = [];
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title.textContent;
      textCellContent.push(heading);
    }
    // Build row: [image, text content]
    rows.push([
      img || '',
      textCellContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
