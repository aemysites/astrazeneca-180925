/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate column divs
  const columns = Array.from(element.children).filter((col) => col.classList.contains('parsys_column'));

  const headerRow = ['Columns (columns168)'];

  // Always output the correct number of columns, even if all are empty
  // But if a column only contains spacers, output an empty string for that cell
  const contentRow = columns.map((col) => {
    // Find all non-spacer children
    const meaningful = Array.from(col.children).filter(child => {
      return !(child.classList.contains('spacer') && child.classList.contains('section'));
    });
    // If no meaningful content, output empty string
    if (meaningful.length === 0) return '';
    // If only one meaningful child, use it directly
    return meaningful.length === 1 ? meaningful[0] : meaningful;
  });

  // Only build table if there is at least one column (even if empty)
  if (columns.length > 0) {
    const cells = [headerRow, contentRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
