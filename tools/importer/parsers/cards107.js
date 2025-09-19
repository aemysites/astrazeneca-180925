/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card column
  function extractCardContent(cardColumn) {
    const panel = cardColumn.querySelector('.linkImagePanelV2.section .link-image-panel-v2');
    if (!panel) return null;

    // Find the image (prefer the one inside the <a> for alt text)
    let img = null;
    const link = panel.querySelector('a.link-image-panel-v2__slider');
    if (link) {
      img = link.querySelector('img.link-image-panel-v2__image');
    }
    if (!img) {
      img = panel.querySelector('img');
    }
    if (!img) return null;

    // Find the title
    let title = '';
    const titleSpan = panel.querySelector('.link-image-panel-v2__title-decoration');
    if (titleSpan) {
      title = titleSpan.textContent.trim();
    }

    // Compose text content (title only, as there is no description in source)
    const textDiv = document.createElement('div');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      textDiv.appendChild(strong);
    }
    // Add CTA link if present
    if (link && link.href) {
      textDiv.appendChild(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = title;
      textDiv.appendChild(cta);
    }

    return [img, textDiv];
  }

  // Get all card columns (immediate children)
  const cardColumns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header
  const headerRow = ['Cards (cards107)'];
  const rows = [headerRow];

  // For each card, extract image and text
  cardColumns.forEach((col) => {
    const card = extractCardContent(col);
    // Only add rows where BOTH image and text are present (no empty columns)
    if (card && card[0] && card[1]) {
      rows.push([card[0], card[1]]);
    }
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
