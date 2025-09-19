/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child columns
  function getColumns(parent) {
    // Only get direct children columns
    return Array.from(parent.querySelectorAll(':scope > .parsys_column'));
  }

  // Find the two main columns inside the block
  let columns = [];
  // Find the wrapperPar > parsys_column (the main columns container)
  const wrapperPar = element.querySelector('.wrapperPar');
  if (wrapperPar) {
    // There may be one .parsys_column inside wrapperPar
    const mainColumns = getColumns(wrapperPar);
    if (mainColumns.length) {
      // Each main column may have its own children columns
      mainColumns.forEach((mainCol) => {
        const subCols = getColumns(mainCol);
        if (subCols.length) {
          columns.push(...subCols);
        } else {
          columns.push(mainCol);
        }
      });
    } else {
      columns.push(wrapperPar);
    }
  } else {
    // fallback: try direct columns on element
    columns = getColumns(element);
  }

  // Defensive: only keep columns with actual content
  columns = columns.filter(col => col && col.children && col.children.length);

  // If no columns found, fallback to entire element
  if (columns.length === 0) {
    columns = [element];
  }

  // Build the table rows
  const headerRow = ['Columns (columns98)'];

  // Second row: each column's content as a cell
  const secondRow = columns.map((col) => {
    // For each column, gather all its direct children except style clears
    const contentEls = Array.from(col.children).filter((child) => {
      // Ignore clear:both divs and empty spacers
      if (child.getAttribute('style') === 'clear:both') return false;
      if (child.classList.contains('spacer')) return false;
      return true;
    });
    // If only one element, use it directly
    if (contentEls.length === 1) return contentEls[0];
    // If multiple, return as array
    if (contentEls.length > 1) return contentEls;
    // If none, fallback to column itself
    return col;
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
