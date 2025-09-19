/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns (direct children)
  const columns = Array.from(element.children).filter(div => div.className && div.className.startsWith('parsys_column l-two-block--offset-right-c'));
  if (columns.length !== 2) return;

  // COLUMN 1: image
  const col0 = columns[0];
  let col0Content = [];
  const img = col0.querySelector('img');
  if (img) col0Content.push(img);

  // COLUMN 2: text + button
  const col1 = columns[1];
  let col1Content = [];
  // Get all rich text children (p, etc)
  const richText = col1.querySelector('.rich-text');
  if (richText) {
    Array.from(richText.children).forEach(child => col1Content.push(child));
  }
  // Get the button
  const cta = col1.querySelector('.callToAction a');
  if (cta) col1Content.push(cta);

  // Compose table
  const headerRow = ['Columns (columns181)'];
  const contentRow = [col0Content, col1Content];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Always replace the element, even if empty
  element.replaceWith(table);
}
