/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the list of links
  const ul = element.querySelector('ul.curator__links');
  if (!ul) return;
  const links = Array.from(ul.querySelectorAll('li.curator__link'));

  // Each link is a button inside a div, inside the li
  // We'll collect the anchor elements
  const columns = links.map(li => {
    // Defensive: find the button anchor
    const anchor = li.querySelector('a.button');
    if (anchor) {
      return anchor;
    }
    // fallback: if not found, use the whole li
    return li;
  });

  // Compose table rows
  const headerRow = ['Columns (columns17)'];
  const columnsRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
