/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two-column wrapper
  const columnsWrapper = element.querySelector('.parsys_column.l-two-block--offset-right');
  if (!columnsWrapper) return;

  // Get the two column divs
  const columnDivs = Array.from(columnsWrapper.children).filter(div => div.classList.contains('parsys_column'));
  if (columnDivs.length < 2) return;

  // LEFT COLUMN: image
  let leftCellContent = null;
  const imageSection = columnDivs[0].querySelector('.image.section');
  if (imageSection) {
    const imageEl = imageSection.querySelector('img');
    if (imageEl) leftCellContent = imageEl;
  }

  // RIGHT COLUMN: quote
  let rightCellContent = null;
  const quoteSection = columnDivs[1].querySelector('.quote.section');
  if (quoteSection) {
    const blockquote = quoteSection.querySelector('blockquote');
    if (blockquote) rightCellContent = blockquote;
  }

  // If either cell is missing, still create the table with empty cell
  const headerRow = ['Columns (columns68)'];
  const columnsRow = [leftCellContent || '', rightCellContent || ''];

  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  element.replaceWith(table);
}
