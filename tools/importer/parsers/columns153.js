/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // LEFT COLUMN
  const leftCol = columns[0];
  let leftCellContent = '';

  // Extract jump-to section (menu)
  const jumpTo = leftCol.querySelector('.jumpTo');
  if (jumpTo) {
    const title = jumpTo.querySelector('.jump-to__title');
    const list = jumpTo.querySelector('.jump-to__list');
    if (title) leftCellContent += `<div>${title.outerHTML}</div>`;
    if (list) leftCellContent += `<div>${list.outerHTML}</div>`;
  }

  // Extract PDF viewer button as link (replace PDF viewer block with link only)
  const pdfViewer = leftCol.querySelector('.cmp-pdfviewer');
  if (pdfViewer) {
    const btn = pdfViewer.querySelector('button span');
    const pdfPath = pdfViewer.getAttribute('data-document-path');
    if (btn && pdfPath) {
      leftCellContent += `<div><a href="${pdfPath}">${btn.textContent.trim()}</a></div>`;
    }
  }

  // RIGHT COLUMN
  const rightCol = columns[1];
  let rightCellContent = '';
  const richText = rightCol.querySelector('.rich-text');
  if (richText) {
    rightCellContent = richText.innerHTML;
  }

  // If both columns are empty, abort
  if (!leftCellContent && !rightCellContent) return;

  // Only output columns that have content (no unnecessary empty columns)
  const headerRow = ['Columns (columns153)'];
  const bodyRow = [];
  if (leftCellContent) bodyRow.push(leftCellContent);
  if (rightCellContent) bodyRow.push(rightCellContent);
  const cells = [headerRow, bodyRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
