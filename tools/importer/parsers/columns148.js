/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Helper to extract meaningful content from a column
  function extractContent(col) {
    // Gather all non-empty elements or text
    return Array.from(col.childNodes).filter(node => {
      if (node.nodeType === 1) {
        // Element node: keep if it has meaningful content or images
        if (
          node.tagName === 'IMG' ||
          node.querySelector('img, picture, video, iframe, a, p, span') ||
          node.textContent.trim()
        ) {
          return true;
        }
        return false;
      }
      if (node.nodeType === 3) {
        // Text node: keep if not just whitespace
        return node.textContent.trim();
      }
      return false;
    });
  }

  const col1Cell = extractContent(columns[0]);
  const col2Cell = extractContent(columns[1]);

  // Only build table if both columns have content
  if (!(col1Cell.length && col2Cell.length)) return;

  const headerRow = ['Columns (columns148)'];
  const cells = [col1Cell, col2Cell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
