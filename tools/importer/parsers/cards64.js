/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a linkImagePanelV2 block
  function extractCard(cardRoot) {
    // Find the main image (first <img> inside the block)
    const img = cardRoot.querySelector('img');
    // Find the link (should wrap the card content)
    const link = cardRoot.querySelector('a');
    let title = '', description = '', ctaHref = '', ctaText = '';
    if (link) {
      // Try to get the title from the span inside h2
      const titleSpan = link.querySelector('.link-image-panel-v2__title-decoration');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      }
      ctaHref = link.href;
      // Use the full link text for CTA if present
      ctaText = link.textContent.replace(/\s+/g, ' ').trim();
    }
    // Try to get description if present (look for description-like element)
    // In this HTML, there is no description, but be flexible for future cases
    // Build the text cell: Heading + Description + CTA link
    const textCell = document.createElement('div');
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title;
      textCell.appendChild(heading);
    }
    if (description) {
      const desc = document.createElement('p');
      desc.textContent = description;
      textCell.appendChild(desc);
    }
    if (ctaHref && ctaText) {
      const cta = document.createElement('a');
      cta.href = ctaHref;
      cta.textContent = ctaText;
      textCell.appendChild(cta);
    }
    return [img, textCell];
  }

  // Get the two card columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Each column contains one card block
  const cards = [];
  columns.forEach(col => {
    const cardBlock = col.querySelector('.linkImagePanelV2');
    if (cardBlock) {
      cards.push(extractCard(cardBlock));
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards64)'];
  const rows = [headerRow];
  cards.forEach(cardCells => {
    rows.push(cardCells);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
