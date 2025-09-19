/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a column
  function extractCardContent(col) {
    // Get image (mandatory)
    const img = col.querySelector('img');

    // Get text content (title + description)
    let title = '', description = '';
    const article = col.querySelector('article');
    if (article) {
      const h3 = article.querySelector('h3');
      if (h3) title = h3.textContent.trim();
      const descDiv = article.querySelector('.text-action-block__copy-wrapper');
      if (descDiv) {
        // Get all <p> inside descDiv, join their text
        const ps = Array.from(descDiv.querySelectorAll('p'));
        description = ps.map(p => p.textContent.trim()).join('\n');
      }
    }

    // Build text content element
    const frag = document.createDocumentFragment();
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title;
      frag.appendChild(h);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description;
      frag.appendChild(p);
    }

    // Only return a row if both image and text content are present
    if (img && (title || description)) {
      return [img, frag];
    }
    return null;
  }

  // Get all immediate card columns
  const cols = element.querySelectorAll(':scope > div');
  const rows = [];
  // Header row
  rows.push(['Cards (cards99)']);

  cols.forEach(col => {
    const cardRow = extractCardContent(col);
    if (cardRow) {
      rows.push(cardRow);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
