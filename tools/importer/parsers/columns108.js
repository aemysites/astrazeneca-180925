/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct columns (should be two for this layout)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // For each column, extract only meaningful content: image, h3, p, CTA
  const columnCells = columns.map((col) => {
    const cellContent = [];
    // Image (logo)
    const img = col.querySelector('.image img');
    if (img) cellContent.push(img);
    // Title (h3)
    const h3 = col.querySelector('.text h3');
    if (h3) cellContent.push(h3);
    // Description (all <p> in .text)
    col.querySelectorAll('.text p').forEach(paragraph => {
      if (paragraph.textContent.trim()) cellContent.push(paragraph);
    });
    // CTA button
    const cta = col.querySelector('.callToAction a');
    if (cta) cellContent.push(cta);
    // Only return if there is actual content
    return cellContent.length > 0 ? cellContent : null;
  }).filter(cellArr => Array.isArray(cellArr) && cellArr.length > 0);

  // Only keep as many columns as there are actual content blocks (should be 2 for this layout)
  if (columnCells.length < 2) return;

  // Table header (block name)
  const headerRow = ['Columns (columns108)'];
  // Table content row (columns) - one cell per content block
  const contentRow = columnCells;

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
