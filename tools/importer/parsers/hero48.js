/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero-header element
  const heroHeader = element.querySelector('.hero-header');

  // Prepare header row
  const headerRow = ['Hero (hero48)'];

  // Prepare background image row (empty string if not present)
  let bgImageRow = [''];
  if (heroHeader) {
    let styleUrl = heroHeader.style && heroHeader.style.backgroundImage;
    let dataUrl = heroHeader.getAttribute('data-hlx-background-image');
    let bgUrl = '';
    if (styleUrl && styleUrl !== "url('')" && styleUrl !== 'url("")') {
      bgUrl = styleUrl.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    } else if (dataUrl && dataUrl !== "url('')" && dataUrl !== 'url("")') {
      bgUrl = dataUrl.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    }
    if (bgUrl) {
      const img = document.createElement('img');
      img.src = bgUrl;
      bgImageRow = [img];
    }
  }

  // Prepare content row: title (h1)
  let contentRow = [''];
  if (heroHeader) {
    const title = heroHeader.querySelector('h1');
    if (title) {
      contentRow = [title];
    }
  }

  // Compose table rows: always 3 rows (header, bg, content)
  const rows = [headerRow, bgImageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
