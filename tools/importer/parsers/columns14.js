/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main column containers
  const columns = element.querySelectorAll('.parsys_column.l-two-block--offset-left-c0, .parsys_column.l-two-block--offset-left-c1');

  // Prepare an array for each column's content
  const colCells = [];

  // LEFT COLUMN: heading, paragraphs, CTA
  if (columns[0]) {
    const leftContent = [];
    const heading = columns[0].querySelector('.rich-text h2');
    if (heading) leftContent.push(heading);
    const paragraphs = columns[0].querySelectorAll('.rich-text p');
    paragraphs.forEach(p => leftContent.push(p));
    const cta = columns[0].querySelector('.callToAction a');
    if (cta) leftContent.push(cta);
    if (leftContent.length > 0) colCells.push(leftContent);
  }

  // RIGHT COLUMN: image
  if (columns[1]) {
    const rightContent = [];
    const img = columns[1].querySelector('img');
    if (img) rightContent.push(img);
    if (rightContent.length > 0) colCells.push(rightContent);
  }

  // Only create a row if there is at least one column with content
  if (colCells.length > 0) {
    const headerRow = ['Columns (columns14)'];
    const cells = [headerRow, colCells];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
