/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to safely get background image URL from style attribute
  function getBackgroundImageUrl(el) {
    if (!el) return '';
    const style = el.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
    if (match && match[1] && match[1] !== '') {
      return match[1];
    }
    // Try data-hlx-background-image
    const bg = el.getAttribute('data-hlx-background-image');
    if (bg && bg !== 'url("")') {
      const urlMatch = bg.match(/url\(['"]?(.*?)['"]?\)/i);
      if (urlMatch && urlMatch[1]) return urlMatch[1];
    }
    return '';
  }

  // 1. Header row
  const headerRow = ['Hero (hero38)'];

  // 2. Background image row (optional)
  // Find the hero-header div (may have background-image)
  const heroHeader = element.querySelector('.hero-header');
  let backgroundImgCell = '';
  const bgUrl = getBackgroundImageUrl(heroHeader);
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    backgroundImgCell = img;
  } else {
    backgroundImgCell = '';
  }

  // 3. Content row: Title, Subheading, CTA
  // Title: h1 inside .hero-header__title
  let titleEl = null;
  if (heroHeader) {
    const titleWrap = heroHeader.querySelector('.hero-header__title');
    if (titleWrap) titleEl = titleWrap;
  }

  // Subheading and paragraph: h2 and p inside .rich-text
  let subheadingEl = null;
  let paragraphEl = null;
  const richText = element.querySelector('.rich-text');
  if (richText) {
    const h2 = richText.querySelector('h2');
    if (h2) subheadingEl = h2;
    const p = richText.querySelector('p');
    if (p) paragraphEl = p;
  }

  // Compose content cell
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (paragraphEl) contentCell.push(paragraphEl);

  // Table rows
  const rows = [
    headerRow,
    [backgroundImgCell],
    [contentCell]
  ];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
