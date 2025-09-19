/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns (left: jump to, right: main content)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only keep columns that have meaningful content (not just whitespace or empty containers)
  const contentColumns = columns.filter(col => {
    // Remove columns that are empty or only contain whitespace
    // Also remove columns that have no visible elements (e.g., only empty divs)
    const text = col.textContent.replace(/\u00a0/g, '').trim();
    // Check if there's at least one visible child element or text
    return (col.children.length > 0 || text.length > 0);
  });

  // Only build if at least two columns with actual content
  if (contentColumns.length < 2) return;

  const headerRow = ['Columns (columns190)'];
  const columnsRow = contentColumns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
