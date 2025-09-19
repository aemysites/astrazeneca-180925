/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card items
  const cardItems = Array.from(
    element.querySelectorAll('.az-filter-items__results-list > .az-filter-items__results-list-item')
  );

  // Table header row per block spec
  const headerRow = ['Cards (cards13)'];

  // Build card rows
  const rows = cardItems.map((li) => {
    // Image: reference the actual <img> element
    const img = li.querySelector('img');

    // Title: extract from .az-filter-items__results-item-title
    const titleDiv = li.querySelector('.az-filter-items__results-item-title');
    let titleEl = null;
    if (titleDiv && titleDiv.textContent.trim()) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleDiv.textContent.trim();
    }

    // Date: extract from <time>
    const dateEl = li.querySelector('time');
    let dateText = '';
    if (dateEl && dateEl.textContent.trim()) {
      dateText = dateEl.textContent.trim();
    }

    // Compose right cell (title + date as description)
    const textCell = document.createElement('div');
    if (titleEl) {
      textCell.appendChild(titleEl);
    }
    if (dateText) {
      const dateP = document.createElement('div');
      dateP.textContent = dateText;
      textCell.appendChild(dateP);
    }

    // Always reference the actual <img> element (do not clone)
    return [img, textCell];
  });

  // Compose table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure header row contains exactly one column, no extra th or colspan
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length > 1) {
    while (headerTr.children.length > 1) {
      headerTr.removeChild(headerTr.lastChild);
    }
  }
  const th = table.querySelector('th');
  if (th) {
    th.removeAttribute('colspan');
  }
  element.replaceWith(table);
}
