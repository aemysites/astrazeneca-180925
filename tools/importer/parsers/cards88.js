/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards88)'];
  const rows = [headerRow];

  // Get all immediate child columns (cards)
  const columns = element.querySelectorAll(':scope > div');

  columns.forEach((col) => {
    // Find image (mandatory)
    const img = col.querySelector('img');
    if (!img) return;

    // Find the text content: get all text from .content-tile__content-wrapper, but fallback to all text in col
    let textCell = document.createElement('div');
    const textWrapper = col.querySelector('.content-tile__content-wrapper');
    if (textWrapper) {
      textCell.innerHTML = textWrapper.innerHTML;
    } else {
      // fallback: get all <p> and <b> tags inside col
      const psAndBs = col.querySelectorAll('p, b');
      if (psAndBs.length > 0) {
        psAndBs.forEach((node) => {
          textCell.appendChild(node.cloneNode(true));
        });
      } else {
        textCell.textContent = col.textContent;
      }
    }

    // Only add row if BOTH image and text content are present and non-empty
    if (img.getAttribute('src') && textCell.textContent && textCell.textContent.trim()) {
      rows.push([img, textCell]);
    }
  });

  // Remove any rows that have empty cells (shouldn't be needed, but for safety)
  const finalRows = [rows[0]];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (
      Array.isArray(row) &&
      row.length === 2 &&
      row[0] && row[1] &&
      row[0].tagName === 'IMG' &&
      row[1].textContent && row[1].textContent.trim() &&
      row[0].getAttribute('src') && row[0].getAttribute('src').trim()
    ) {
      finalRows.push(row);
    }
  }

  // Create block table with only header and actual card rows (no empty or partial rows)
  const block = WebImporter.DOMUtils.createTable(finalRows, document);
  element.replaceWith(block);
}
