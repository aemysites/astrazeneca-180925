/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card panels
  const cardPanels = Array.from(element.querySelectorAll('.linkImagePanelV2.section'));

  // Header row: block name only (single column)
  const headerRow = ['Cards (cards94)'];
  const rows = [headerRow];

  cardPanels.forEach(panel => {
    // Get image (first image inside .link-image-panel-v2)
    const img = panel.querySelector('.link-image-panel-v2 > img');

    // Get all text content from the wrapper
    const wrapper = panel.querySelector('.link-image-panel-v2__wrapper');
    const textCell = [];
    if (wrapper) {
      // Title
      const titleSpan = wrapper.querySelector('.link-image-panel-v2__title-decoration');
      if (titleSpan) {
        const strong = document.createElement('strong');
        strong.textContent = titleSpan.textContent.trim();
        textCell.push(strong);
      }
      // Description (all paragraphs)
      const descPs = wrapper.querySelectorAll('p');
      descPs.forEach(p => {
        textCell.push(p.cloneNode(true));
      });
      // CTA (if present)
      const a = panel.querySelector('a.link-image-panel-v2__slider');
      if (a && a.href) {
        const cta = document.createElement('a');
        cta.href = a.href;
        cta.textContent = 'Learn more';
        textCell.push(cta);
      }
    }
    rows.push([img, textCell]);
  });

  // Build table
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = headerRow[0];
  trHead.appendChild(th);
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let i = 1; i < rows.length; i++) {
    const tr = document.createElement('tr');
    rows[i].forEach(cell => {
      const td = document.createElement('td');
      if (Array.isArray(cell)) {
        cell.forEach(el => {
          if (el) td.appendChild(el);
        });
      } else if (cell) {
        td.appendChild(cell);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  element.replaceWith(table);
}
