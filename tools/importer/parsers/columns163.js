/* global WebImporter */
export default function parse(element, { document }) {
  // Find the wrapper containing the icon panels
  const wrapper = element.querySelector('.icon-link-panel__wrapper');
  if (!wrapper) return;

  // Get all direct children (should be <a> or <div> for each column)
  const items = Array.from(wrapper.children);

  // For each item, extract image (as element) and title (as element)
  const columns = items.map((item) => {
    const cellContent = [];
    // Get image
    const img = item.querySelector('.icon-link-panel__image-wrapper img');
    if (img) cellContent.push(img);
    // Get title
    const title = item.querySelector('.icon-link-panel__image-title');
    if (title) cellContent.push(title);
    return cellContent;
  });

  // Build the table: header row, then one row with all columns
  const headerRow = ['Columns (columns163)'];
  const tableRows = [headerRow, columns];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
