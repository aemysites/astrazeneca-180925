/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns114)'];

  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Collect content for each column
  const cellsRow = columns.map((col) => {
    const colContent = [];
    Array.from(col.children).forEach((child) => {
      if (child.classList.contains('image')) {
        const img = child.querySelector('img');
        if (img) colContent.push(img);
      } else if (child.classList.contains('text')) {
        const richText = child.querySelector('.rich-text');
        if (richText) {
          colContent.push(...Array.from(richText.children));
        }
      }
    });
    // Only return content if present, otherwise skip this column
    return colContent.length ? colContent : null;
  }).filter(cell => cell !== null);

  // Compose the table
  const cells = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
