/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Only include columns that have actual content (no empty columns)
  const cells = columns.map(col => {
    // Try to extract the main section inside each column, if present
    let content = col.querySelector('.quote.section, .image.section');
    if (!content) content = col;
    // Only include if there is visible content (text or images)
    if (content.textContent.trim() || content.querySelector('img')) {
      return content;
    }
    return null;
  }).filter(cell => cell);

  // Only create a row if there is at least one non-empty cell
  if (cells.length === 0) return;

  const headerRow = ['Columns (columns66)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
