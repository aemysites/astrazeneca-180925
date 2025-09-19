/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a contentTile block
  function extractCard(tile) {
    // Find the image element (reference, not clone)
    const img = tile.querySelector('img');
    // Find the title element
    const title = tile.querySelector('.content-tile__title');
    // Compose the text cell
    let textCell = document.createElement('div');
    if (title) {
      // Title as heading (use <strong> for heading style)
      const heading = document.createElement('strong');
      heading.textContent = title.textContent.trim();
      textCell.appendChild(heading);
    }
    // No description or CTA in source HTML, so only title
    return [img, textCell];
  }

  // Get all immediate columns (cards)
  const columns = element.querySelectorAll(':scope > div');
  const cards = [];
  columns.forEach((col) => {
    // Each column contains one contentTile
    const tile = col.querySelector('.contentTile');
    if (tile) {
      cards.push(extractCard(tile));
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards138)'];
  const rows = [headerRow];
  cards.forEach(card => {
    rows.push(card);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
