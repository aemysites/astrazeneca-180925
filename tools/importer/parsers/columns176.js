/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns inside the .parsys_column.l-two-block
  const columnsBlock = element.querySelector('.parsys_column.l-two-block');
  if (!columnsBlock) return;
  const columns = columnsBlock.querySelectorAll(':scope > .parsys_column');
  if (columns.length !== 2) return;

  // LEFT COLUMN: Quote block
  const leftCol = columns[0];
  let leftContent = '';
  const quote = leftCol.querySelector('blockquote');
  if (quote) {
    // Clone the blockquote to avoid removing from DOM
    const quoteClone = quote.cloneNode(true);
    // Remove any extraneous classes
    quoteClone.className = '';
    // Ensure all text and semantic HTML is preserved
    leftContent = quoteClone;
  } else {
    leftContent = leftCol.cloneNode(true);
  }

  // RIGHT COLUMN: Image block
  const rightCol = columns[1];
  let rightContent = '';
  const img = rightCol.querySelector('img');
  if (img) {
    // Reference the existing <img> element
    rightContent = img;
  } else {
    rightContent = rightCol.cloneNode(true);
  }

  // Build the table rows
  const headerRow = ['Columns (columns176)'];
  const contentRow = [leftContent, rightContent];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
