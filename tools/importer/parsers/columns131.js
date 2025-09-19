/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const cells = [];

  // Left column: rich text content
  if (columns[0]) {
    const richText = columns[0].querySelector('.rich-text');
    if (richText && richText.textContent.trim()) {
      cells.push(richText);
    } else if (columns[0].textContent.trim()) {
      cells.push(columns[0]);
    }
  }

  // Right column: jump-to block (skip spacer)
  if (columns[1]) {
    const jumpTo = columns[1].querySelector('.jump-to');
    if (jumpTo && jumpTo.textContent.trim()) {
      cells.push(jumpTo);
    } // Do NOT add the right column if it's empty
  }

  // Only create columns for cells with actual content
  const headerRow = ['Columns (columns131)'];
  const tableRows = [headerRow, cells];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
