/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // If there are not exactly two columns, fallback to original element
  if (columns.length !== 2) return;

  // Left column: collect all content except spacers
  const leftContent = [];
  Array.from(columns[0].children).forEach((child) => {
    if (!child.classList.contains('spacer')) {
      leftContent.push(child);
    }
  });

  // Right column: image only
  let rightContent = [];
  const img = columns[1].querySelector('img');
  if (img) rightContent.push(img);

  // Both columns must have content for a two-column block
  if (leftContent.length === 0 || rightContent.length === 0) return;

  const headerRow = ['Columns (columns109)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
