/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to filter out spacers and empty divs
  function isContentSection(node) {
    if (!node) return false;
    if (node.classList && node.classList.contains('spacer')) return false;
    // Remove empty divs
    if (node.tagName === 'DIV' && node.textContent.trim() === '' && !node.querySelector('img')) return false;
    return true;
  }

  // Find the two columns
  const columns = Array.from(element.children).filter((col) => col.classList && col.classList.contains('parsys_column'));
  // Defensive: fallback to all direct children if not found
  const col0 = columns[0] || element.children[0];
  const col1 = columns[1] || element.children[1];

  // For each column, collect relevant content (skip spacers)
  function extractColumnContent(col) {
    if (!col) return [];
    // Only direct children (sections)
    const sections = Array.from(col.children).filter(isContentSection);
    // Return as array of elements
    return sections;
  }

  const col0Content = extractColumnContent(col0);
  const col1Content = extractColumnContent(col1);

  // Table structure: header row, then one row with two columns
  const headerRow = ['Columns (columns196)'];
  const contentRow = [col1Content, col0Content]; // visually, text is left, image is right

  // But in the HTML, col0 is image, col1 is text. Screenshot shows text on left, image on right.
  // So, col1 (text) first, col0 (image) second.

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
