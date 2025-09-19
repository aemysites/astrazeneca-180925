/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image, title, and description from a card column
  function extractCardContent(cardEl) {
    // Get image (mandatory)
    const img = cardEl.querySelector('img');

    // Get title (optional, as heading)
    let title = null;
    const headerSection = cardEl.querySelector('.sectionHeader, section.section-header');
    if (headerSection) {
      title = headerSection.querySelector('h2, h1, h3, h4');
    }

    // Get description (optional)
    let desc = null;
    const textSection = cardEl.querySelector('.text .rich-text, .text, .rich-text');
    if (textSection) {
      desc = textSection.querySelector('p');
    }

    // Compose text cell: title (as heading), then description
    const textCellContent = document.createElement('div');
    if (title) textCellContent.appendChild(title.cloneNode(true));
    if (desc) textCellContent.appendChild(desc.cloneNode(true));

    // Return array of nodes if text exists, else empty string
    const textCell = textCellContent.childNodes.length ? Array.from(textCellContent.childNodes) : '';
    // If no image, return empty string
    const imgCell = img ? img.cloneNode(true) : '';
    return [imgCell, textCell];
  }

  // Table header row
  const headerRow = ['Cards (cards58)'];

  // Find all card columns (immediate children)
  const cardColumns = element.querySelectorAll(':scope > div');

  // Build rows for each card, only if both image and text exist
  const rows = Array.from(cardColumns).map((cardEl) => {
    const [img, textCellContent] = extractCardContent(cardEl);
    // Only include rows with BOTH an image and text content
    if (img && ((Array.isArray(textCellContent) && textCellContent.length) || (typeof textCellContent === 'string' && textCellContent))) {
      return [img, textCellContent];
    }
    return null;
  }).filter(Boolean);

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
