/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only run if not already a table
  if (element.tagName === 'TABLE') return;

  // Get the two main columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length !== 2) return;

  // --- COLUMN 1 (image) ---
  let imageEl = columns[0].querySelector('img');
  if (imageEl) {
    imageEl = imageEl.cloneNode(true);
  } else {
    imageEl = document.createElement('div');
    imageEl.textContent = '';
  }

  // --- COLUMN 2 (text content) ---
  const col1 = columns[1];
  const textEls = [];
  col1.querySelectorAll('.rich-text, .callToAction').forEach((el) => {
    textEls.push(el.cloneNode(true));
  });
  if (textEls.length === 0) {
    textEls.push(document.createElement('div'));
  }

  // Compose the columns row
  const columnsRow = [imageEl, textEls];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns197)'];
  const tableRows = [headerRow, columnsRow];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  if (table && element.parentNode) {
    element.replaceWith(table);
  }
}
