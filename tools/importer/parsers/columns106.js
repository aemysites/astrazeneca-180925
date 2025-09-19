/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract content from a column
  function extractColumnContent(colElem) {
    const parts = [];
    // 1. Image (if present)
    const img = colElem.querySelector('.image.section img');
    if (img) parts.push(img);
    // 2. Rich text block (heading + paragraph)
    const richText = colElem.querySelector('.text.parbase .rich-text');
    if (richText) {
      // Reference the existing element, not clone
      parts.push(richText);
    }
    // 3. CTA button (if present)
    const cta = colElem.querySelector('.callToAction.section a');
    if (cta) parts.push(cta);
    return parts;
  }

  // Get the two columns (they are direct children of the main container)
  const colDivs = Array.from(element.children).filter(el => el.classList.contains('parsys_column'));
  if (colDivs.length === 0) return;

  // Table header: must match block name exactly
  const headerRow = ['Columns (columns106)'];
  // Table body: one row, two columns
  const row = colDivs.map(extractColumnContent);

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace element
  element.replaceWith(table);
}
