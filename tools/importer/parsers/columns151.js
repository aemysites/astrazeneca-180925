/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Extract image from the first column
  const leftCol = columns[0];
  const imageEl = leftCol.querySelector('img');

  // Extract all text from the second column's .rich-text
  const rightCol = columns[1];
  const richText = rightCol.querySelector('.rich-text');

  // Build the row: left is image, right is text
  if (!imageEl || !richText) return;
  const headerRow = ['Columns (columns151)'];
  const contentRow = [imageEl, richText];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
