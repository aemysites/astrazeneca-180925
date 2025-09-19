/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns (be less specific to allow for more flexible parsing)
  const columns = Array.from(element.children);
  if (columns.length < 2) return;

  // Helper to extract all content from a column as a single block, removing <hr> if no Section Metadata
  function extractColumnContent(col) {
    const colDiv = document.createElement('div');
    Array.from(col.childNodes).forEach((node) => {
      // Remove <hr> if present and not followed by Section Metadata table
      if (node.nodeType === 1 && node.tagName === 'DIV' && node.querySelector('hr')) {
        // Only append children that are not <hr>
        Array.from(node.childNodes).forEach((child) => {
          if (!(child.tagName === 'HR')) {
            colDiv.appendChild(child.cloneNode(true));
          }
        });
      } else if (!(node.nodeType === 1 && node.tagName === 'HR')) {
        colDiv.appendChild(node.cloneNode(true));
      }
    });
    return colDiv;
  }

  // Extract content for each column
  const leftContent = extractColumnContent(columns[0]);
  const rightContent = extractColumnContent(columns[1]);

  // Table header row: must be a single column
  const headerRow = ['Columns (columns73)'];

  // Build the rows for the table
  const rows = [headerRow, [leftContent, rightContent]];

  // Use WebImporter.DOMUtils.createTable to build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
