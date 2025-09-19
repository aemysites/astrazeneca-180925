/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns (columns135)'];

  // Get all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only keep columns that have meaningful content (text or images)
  const filteredColumns = columns.map((col) => {
    // Check for any images in this column
    const img = col.querySelector('img');
    // Check for non-empty text content (excluding whitespace)
    const txt = col.textContent.trim();
    // If there's an image or non-empty text, keep this column
    if (img || txt) {
      // If only one child, use it directly; otherwise, use array
      const children = Array.from(col.children).filter(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          return child.textContent.trim() !== '' || child.querySelector('img');
        }
        return false;
      });
      if (children.length === 1) {
        return children[0];
      } else if (children.length > 1) {
        return children;
      } else if (img) {
        return img;
      } else {
        return txt;
      }
    }
    // Otherwise, skip this column
    return null;
  }).filter(cell => cell !== null);

  if (filteredColumns.length < 2) return;

  // Build the table
  const cells = [headerRow, filteredColumns];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
