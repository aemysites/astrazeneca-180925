/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each column
  function extractCard(column) {
    const panel = column.querySelector('.link-image-panel-v2');
    if (!panel) return null;

    // Get the main image (first img in panel)
    const img = panel.querySelector('img');
    if (!img) return null; // Only process cards with images (MANDATORY)

    // Get the link (for CTA)
    const link = panel.querySelector('a.link-image-panel-v2__slider');

    // Get the title (inside h2 > span)
    let titleText = '';
    let titleEl = null;
    if (panel.querySelector('.link-image-panel-v2__title-decoration')) {
      titleText = panel.querySelector('.link-image-panel-v2__title-decoration').textContent.trim();
      titleEl = document.createElement('strong');
      titleEl.textContent = titleText;
    }

    // Compose the text cell (title, CTA)
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    // Only add CTA if present
    if (link && link.href) {
      textCell.push(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = titleText || '詳細はこちら';
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      textCell.push(cta);
    }
    // If no title and no CTA, skip card
    if (!textCell.length) return null;
    return [img, textCell];
  }

  // Get all three columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards20)'];
  rows.push(headerRow);

  // Only include cards with images and text (no empty cells)
  columns.forEach((col) => {
    const card = extractCard(col);
    if (card && card[0] && card[1] && card[1].length) {
      rows.push(card);
    }
  });

  // Only output if at least one card row exists
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
