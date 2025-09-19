/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a card cell from the publication block
  function createCardCell(element, document) {
    const cell = document.createElement('div');

    // Heading (h2 with link and span)
    const header = element.querySelector('.publications-list__header');
    if (header) {
      const link = header.querySelector('a');
      if (link) {
        const h = document.createElement('h3');
        // Move the link's content into the heading
        while (link.firstChild) {
          h.appendChild(link.firstChild);
        }
        if (link.href && link.href !== '') {
          const a = document.createElement('a');
          a.href = link.href;
          a.appendChild(h);
          cell.appendChild(a);
        } else {
          cell.appendChild(h);
        }
      }
    }

    // Authors line
    const authorMeta = element.querySelector('.publications-list__meta-copy[itemprop="author"]');
    if (authorMeta) {
      const authorP = document.createElement('p');
      authorP.innerHTML = `<strong>AstraZeneca author(s):</strong> ${authorMeta.textContent}`;
      cell.appendChild(authorP);
    }

    // Date and Published line
    const dateElem = element.querySelector('.publications-list__date[itemprop="datePublished"]');
    const publisherElem = element.querySelector('.publications-list__meta-copy[itemprop="publisher"]');
    if (dateElem || publisherElem) {
      const metaP = document.createElement('p');
      let metaHTML = '';
      if (dateElem) {
        metaHTML += `<strong>Date:</strong> ${dateElem.textContent} `;
      }
      if (publisherElem) {
        metaHTML += `<strong>Published:</strong> ${publisherElem.textContent}`;
      }
      metaP.innerHTML = metaHTML.trim();
      cell.appendChild(metaP);
    }

    return cell;
  }

  // Table header row
  const headerRow = ['Cards (cardsNoImages69)'];
  // Only one card per block in this source HTML
  const cardRows = [[createCardCell(element, document)]];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cardRows
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
