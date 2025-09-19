/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns157)'];

  // Get all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const cells = [headerRow];

  // Build the columns row, skipping empty columns
  if (columns.length > 0) {
    const contentRow = columns
      .map((col) => {
        // Find the first meaningful child (image or text block)
        const meaningful = Array.from(col.children).find(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.textContent.trim().length > 0) return true;
            if (child.querySelector('img, picture, video, iframe, a, p, span')) return true;
          }
          return false;
        });
        // If found, return it; else, skip this column
        return meaningful || null;
      })
      .filter(cell => cell);
    if (contentRow.length > 0) {
      cells.push(contentRow);
    }
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
