/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero71)'];

  // 2. Background image row: only include if present, otherwise omit
  let bgUrl = '';
  const heroDiv = element.querySelector('.hero-header');
  if (heroDiv) {
    const style = heroDiv.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
    if (match && match[1] && match[1] !== '' && match[1] !== '""') {
      bgUrl = match[1];
    }
  }
  // Only add background row if there is a background image
  const rows = [headerRow];
  if (bgUrl) rows.push([bgUrl]);

  // 3. Content row: Extract the headline/title
  const titleEl = element.querySelector('h1');
  const contentRow = [titleEl ? titleEl : ''];
  rows.push(contentRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
