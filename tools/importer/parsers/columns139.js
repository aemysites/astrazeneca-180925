/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns (should be two)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // First column: get both <h3> as separate columns if present
  let col0Content = null;
  const col0 = columns[0];
  const richText = col0.querySelector('.rich-text');
  let col0Cells = [];
  if (richText) {
    const h3s = Array.from(richText.querySelectorAll('h3'));
    if (h3s.length > 0) {
      col0Cells = h3s.filter(h3 => h3.textContent.trim());
    } else if (richText.textContent.trim()) {
      col0Cells = [richText];
    }
  } else if (col0.textContent.trim()) {
    col0Cells = [col0];
  }

  // Second column: reference the <img> element if present and not empty
  let col1Content = null;
  const col1 = columns[1];
  const img = col1.querySelector('img');
  if (img && img.getAttribute('src')) {
    col1Content = img;
  }

  // Only include columns with actual content (no empty columns)
  const row = [];
  // Add each h3 as a separate column
  if (col0Cells.length > 0) {
    row.push(...col0Cells);
  }
  if (col1Content && col1Content.getAttribute('src')) row.push(col1Content);
  if (row.length === 0) return;

  // Table header must match the target block name exactly
  const headerRow = ['Columns (columns139)'];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
