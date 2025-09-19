/* global WebImporter */
export default function parse(element, { document }) {
  // Get the three column containers
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 3) return;

  // Helper to get all content from a column (including nested blocks)
  function extractColumnContent(col) {
    // Collect all direct children (including text nodes)
    const content = [];
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        content.push(node.cloneNode(true));
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        content.push(document.createTextNode(node.textContent));
      }
    });
    return content.length ? content : null;
  }

  // Extract content for each column
  const col0 = extractColumnContent(columns[0]);
  const col1 = extractColumnContent(columns[1]);
  const col2 = extractColumnContent(columns[2]);

  // Build data row: always 3 columns, empty array for missing content
  const dataRow = [col0 || [], col1 || [], col2 || []];

  // --- Table Construction ---
  const headerRow = ['Columns (columns155)'];
  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
