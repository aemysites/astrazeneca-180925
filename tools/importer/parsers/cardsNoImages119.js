/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card links (each .content-tile--latest-news)
  const cards = Array.from(element.querySelectorAll('.content-tile--latest-news'));

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cardsNoImages119)'];
  rows.push(headerRow);

  cards.forEach(tile => {
    // Build the cell content
    const cell = document.createElement('div');
    cell.style.display = 'flex';
    cell.style.flexDirection = 'column';
    cell.style.gap = '0.5em';

    // Date (optional, above title)
    const date = tile.querySelector('.content-tile__date');
    if (date) {
      const dateP = document.createElement('p');
      dateP.textContent = date.textContent.trim();
      dateP.style.margin = '0';
      cell.appendChild(dateP);
    }

    // Title (mandatory, bold, as heading)
    const title = tile.querySelector('.content-tile__title');
    if (title) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title.textContent.trim();
      cell.appendChild(titleEl);
    }

    // Tags (optional, below title/desc)
    const tags = tile.querySelectorAll('.content-tile__tag');
    if (tags.length > 0) {
      const tagsDiv = document.createElement('div');
      tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag.textContent.trim();
        tagsDiv.appendChild(tagSpan);
      });
      cell.appendChild(tagsDiv);
    }

    rows.push([cell]);
  });

  // Replace the element with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
