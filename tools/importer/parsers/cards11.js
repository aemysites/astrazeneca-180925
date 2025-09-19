/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a column
  function extractCard(col) {
    // Find image element (reference, not clone)
    const img = col.querySelector('img');

    // Find accordion header (title)
    const header = col.querySelector('.accordion__header span:last-child');
    let title = null;
    if (header) {
      title = document.createElement('strong');
      title.textContent = header.textContent.trim();
    }

    // Find accordion description (first paragraph in accordion content)
    const descP = col.querySelector('.accordion__content p');
    let desc = null;
    if (descP) {
      desc = descP.cloneNode(true);
    }

    // Compose text cell: title (as heading), then description
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title);
    if (desc) {
      if (title) textCell.appendChild(document.createElement('br'));
      textCell.appendChild(desc);
    }

    // Only return a row if both image and text content exist
    if (img && (title || desc)) {
      return [img, textCell];
    }
    return null;
  }

  // Get all three columns (each is a card)
  const cols = element.querySelectorAll(':scope > div');
  const rows = Array.from(cols, extractCard).filter(Boolean);

  // Table header
  const headerRow = ['Cards (cards11)'];

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
