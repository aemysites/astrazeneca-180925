/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a column
  function extractCard(column) {
    // Find image
    const img = column.querySelector('img');
    // Find card text block
    const article = column.querySelector('article');
    const textParts = [];
    if (article) {
      const title = article.querySelector('h3');
      if (title) textParts.push(title);
      const desc = article.querySelector('p');
      if (desc) textParts.push(desc);
      const cta = article.querySelector('a');
      if (cta) textParts.push(cta);
    }
    // Only return a row if both image and text are present
    if (img && textParts.length) {
      return [img, textParts];
    }
    return null;
  }

  // Get columns (cards)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [ ['Cards (cards202)'] ]; // Header row

  columns.forEach(col => {
    const cardRow = extractCard(col);
    if (cardRow) {
      rows.push(cardRow);
    }
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
