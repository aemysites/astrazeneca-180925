/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row of column items
  const itemsRow = element.querySelector('.show-more-wrapper__items');
  let columns = [];
  if (itemsRow) {
    // Each direct child .show-more-wrapper__item is a column
    const itemEls = itemsRow.querySelectorAll(':scope > .show-more-wrapper__item');
    columns = Array.from(itemEls).map(item => {
      // Extract the anchor (main content tile)
      const anchor = item.querySelector('a.content-tile');
      if (anchor) {
        // Use the entire anchor element for full content extraction
        return anchor.cloneNode(true);
      }
      // fallback: clone the whole item if anchor not found
      return item.cloneNode(true);
    });
  }

  // Block header row as required
  const headerRow = ['Columns (columns177)'];
  const tableRows = [headerRow];
  // Only add the columns row if there is at least one column
  if (columns.length > 0) {
    tableRows.push(columns);
  }

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
