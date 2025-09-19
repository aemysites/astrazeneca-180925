/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a column div
  function extractCardContent(column) {
    // Image: first .image img
    const img = column.querySelector('.image img');
    // Text: get all content from .text .rich-text (not just h3/p)
    const richText = column.querySelector('.text .rich-text');
    // CTA: .callToAction .button
    const cta = column.querySelector('.callToAction .button');
    // Compose text cell: include all children of .rich-text, then CTA
    const textCellContent = [];
    if (richText) {
      // Append all children (preserves h3, p, etc)
      Array.from(richText.childNodes).forEach((node) => {
        // Only append Elements or Text nodes with content
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          textCellContent.push(node.cloneNode(true));
        }
      });
    }
    if (cta) textCellContent.push(cta.cloneNode(true));
    // Only return row if there is at least image and text
    if (img && textCellContent.length) {
      return [img.cloneNode(true), textCellContent];
    }
    return null;
  }

  // Get all immediate card columns
  const columns = element.querySelectorAll(':scope > div');
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards194)'];
  rows.push(headerRow);
  // Card rows
  columns.forEach((col) => {
    const cardRow = extractCardContent(col);
    if (cardRow) rows.push(cardRow);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
