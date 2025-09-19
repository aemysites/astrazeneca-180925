/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two column containers
  const columnWrapper = element.querySelector('.parsys_column.l-two-block--offset-right');
  if (!columnWrapper) return;
  const columns = columnWrapper.querySelectorAll(':scope > .parsys_column');
  if (columns.length !== 2) return;

  // Left column: jumpTo section
  const leftCol = columns[0];
  const jumpToSection = leftCol.querySelector('.jumpTo.section');
  let leftCellContent = [];
  if (jumpToSection) {
    leftCellContent.push(jumpToSection);
  }

  // Right column: text section
  const rightCol = columns[1];
  const textSection = rightCol.querySelector('.text.parbase.section');
  let rightCellContent = [];
  if (textSection) {
    rightCellContent.push(textSection);
  }

  // Table rows
  const headerRow = ['Columns (columns172)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
