/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = element.querySelectorAll(':scope > div');
  const colCells = [];

  columns.forEach((col) => {
    // Only consider meaningful content: text or image
    // Prefer .rich-text or .responsive-image inside each column
    const richText = col.querySelector('.rich-text');
    const imageSection = col.querySelector('.responsive-image');
    if (richText && richText.textContent.trim().length > 0) {
      colCells.push(richText);
    } else if (imageSection && imageSection.querySelector('img')) {
      colCells.push(imageSection);
    }
    // Do not push empty columns
  });

  if (colCells.length < 2) return; // Only output if at least two columns with content

  const rows = [
    ['Columns (columns187)'],
    colCells
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
