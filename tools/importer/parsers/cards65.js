/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a three-block flex row
  function extractCardsFromRow(row) {
    const cards = [];
    // Each card is in a .parsys_column.l-flex-three-block-cX
    const cardColumns = row.querySelectorAll(':scope > .parsys_column');
    cardColumns.forEach((col) => {
      // Find the .linkImagePanelV2 section
      const panel = col.querySelector('.linkImagePanelV2');
      if (!panel) return;
      // Find the main image (the first <img> inside the panel)
      const img = panel.querySelector('img');
      // Find the link (the <a> inside the panel)
      const link = panel.querySelector('a');
      let title, desc, cta;
      if (link) {
        // Title: in .link-image-panel-v2__title-decoration
        const titleSpan = link.querySelector('.link-image-panel-v2__title-decoration');
        if (titleSpan) {
          title = document.createElement('strong');
          title.textContent = titleSpan.textContent.trim();
        }
        // Description: in .link-image-panel-v2__content
        const descP = link.querySelector('.link-image-panel-v2__content');
        if (descP) {
          desc = document.createElement('p');
          desc.textContent = descP.textContent.trim();
        }
        // CTA: use the link's href and text (title)
        cta = document.createElement('a');
        cta.href = link.href;
        cta.textContent = 'Learn more';
      }
      // Compose text cell
      const textCell = document.createElement('div');
      if (title) textCell.appendChild(title);
      if (desc) textCell.appendChild(desc);
      if (cta) textCell.appendChild(cta);
      // Compose row: [image, text]
      if (img && textCell.childNodes.length > 0) {
        cards.push([img, textCell]);
      }
    });
    return cards;
  }

  // Find the main wrapper that contains the cards
  const lConstrained = element.querySelector('.l-constrained');
  if (!lConstrained) return;

  // Find all .parsys_column.l-flex-three-block (these are the card rows)
  const cardRows = lConstrained.querySelectorAll('.parsys_column.l-flex-three-block');

  // Build table rows
  const tableRows = [];
  // Header row
  tableRows.push(['Cards (cards65)']);

  // For each card row, extract cards
  cardRows.forEach((row) => {
    const cards = extractCardsFromRow(row);
    cards.forEach((card) => {
      tableRows.push(card);
    });
  });

  // Create table manually to ensure header has colspan=2
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Cards (cards65)';
  th.setAttribute('colspan', '2');
  headerTr.appendChild(th);
  thead.appendChild(headerTr);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  for (let i = 1; i < tableRows.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.appendChild(tableRows[i][0]);
    const td2 = document.createElement('td');
    td2.appendChild(tableRows[i][1]);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  element.replaceWith(table);
}
