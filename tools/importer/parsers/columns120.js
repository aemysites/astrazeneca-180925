/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // First column: image (with video overlay)
  let col0Content = [];
  const col0 = columns[0];
  // Instead of only looking for .image.section, grab all content in the column
  Array.from(col0.childNodes).forEach((node) => {
    if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
      col0Content.push(node.cloneNode(true));
    }
  });

  // Second column: text content (grab all content in the column)
  let col1Content = [];
  const col1 = columns[1];
  Array.from(col1.childNodes).forEach((node) => {
    if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
      col1Content.push(node.cloneNode(true));
    }
  });

  // Only include columns that have content (no empty columns)
  const contentRow = [];
  if (col0Content.length) contentRow.push(col0Content);
  if (col1Content.length) contentRow.push(col1Content);
  if (!contentRow.length) return;

  const headerRow = ['Columns (columns120)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
