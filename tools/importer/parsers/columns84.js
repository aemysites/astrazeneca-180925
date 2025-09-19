/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const headerRow = ['Columns (columns84)'];

  // First column: quote only
  const col0 = columns[0];
  const quote = col0.querySelector('.quote');
  const col0Content = quote ? [quote] : [''];

  // Second column: image only
  const col1 = columns[1];
  const img = col1.querySelector('img');
  const col1Content = img ? [img] : [''];

  // Compose the columns side by side (always two columns)
  const rows = [
    headerRow,
    [col0Content, col1Content],
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
