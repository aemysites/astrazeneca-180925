/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate <li> children inside the .curator__links <ul>
  const ul = element.querySelector('ul.curator__links');
  const liNodes = ul ? Array.from(ul.children) : [];

  // Each <li> contains a button link. We'll place each in its own column.
  const columns = liNodes.map((li) => {
    // Defensive: find the button link inside each li
    const buttonDiv = li.querySelector('div.button--center');
    // If found, use the div directly (contains the <a> and <span> structure)
    return buttonDiv || li;
  });

  // Table header row as specified
  const headerRow = ['Columns (columns122)'];
  // Second row: one column per button
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
