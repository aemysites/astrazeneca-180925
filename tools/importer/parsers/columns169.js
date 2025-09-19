/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only proceed if we have at least two columns
  if (columns.length < 2) return;

  // Only keep columns with actual content (no empty columns)
  const cellContents = [];
  for (const col of columns) {
    const contents = [];
    // For image columns, include the image
    const img = col.querySelector('img');
    if (img) contents.push(img);
    // For text columns, include rich text and CTA
    const richText = col.querySelector('.rich-text');
    if (richText) contents.push(richText);
    const cta = col.querySelector('.callToAction a');
    if (cta) contents.push(cta);
    // Only add this column if it has content (ignore empty columns)
    if (contents.length > 0) {
      cellContents.push(contents);
    }
  }

  // If all columns are empty, do nothing
  if (cellContents.length === 0) return;

  // Remove any empty columns (should not be present, but extra check)
  const filteredCells = cellContents.filter(cell => cell && cell.length > 0);
  if (filteredCells.length === 0) return;

  // Build table rows
  const headerRow = ['Columns (columns169)'];
  const contentRow = filteredCells;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
