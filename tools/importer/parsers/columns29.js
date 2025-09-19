/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers
  const columns = Array.from(element.querySelectorAll('.parsys_column.l-two-block--padded > .parsys_column'));

  // Defensive fallback if columns not found
  const col0 = columns[0] || element.querySelector('.parsys_column.l-two-block--padded-c0');
  const col1 = columns[1] || element.querySelector('.parsys_column.l-two-block--padded-c1');

  // Column 1: image and CTA
  let col1Content = [];
  if (col0) {
    // Get image
    const img = col0.querySelector('.image.section img');
    if (img) col1Content.push(img.cloneNode(true));
    // Get CTA
    const cta = col0.querySelector('.callToAction.section a');
    if (cta) col1Content.push(cta.cloneNode(true));
  }

  // Column 2: quote, author, title
  let col2Content = [];
  if (col1) {
    const quoteSection = col1.querySelector('.quote.section blockquote');
    if (quoteSection) {
      // Get quote text
      const quoteText = quoteSection.querySelector('.quote__wrapper p');
      if (quoteText) col2Content.push(quoteText.cloneNode(true));
      // Get author and title
      const cite = quoteSection.querySelector('footer.quote__footer cite');
      if (cite) {
        // Author name
        const author = cite.childNodes[0];
        if (author && author.textContent.trim()) {
          col2Content.push(document.createTextNode(author.textContent.trim()));
        }
        // Author title
        const authorTitle = cite.querySelector('.quote__author-title');
        if (authorTitle) {
          col2Content.push(document.createElement('br'));
          col2Content.push(document.createTextNode(authorTitle.textContent.trim()));
        }
      }
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns29)'];
  const tableRows = [headerRow, [col1Content, col2Content]];

  // Create table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace element
  element.replaceWith(table);
}
