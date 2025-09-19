/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers
  const columns = Array.from(
    element.querySelectorAll('.parsys_column.l-two-block--padded > .parsys_column')
  );

  // Defensive fallback if not found
  if (columns.length === 0) {
    const fallback = element.querySelectorAll('.parsys_column');
    if (fallback.length > 1) {
      columns.push(...fallback);
    }
  }

  // For each column, collect all semantic content in order
  function extractColumnContent(col) {
    const content = [];
    Array.from(col.children).forEach((child) => {
      // Image
      if (child.classList.contains('image')) {
        const img = child.querySelector('img');
        if (img) content.push(img);
      }
      // Heading (rich text)
      if (child.classList.contains('text')) {
        const rich = child.querySelector('.rich-text');
        if (rich) {
          Array.from(rich.children).forEach((e) => {
            // Only push headings and paragraphs
            if (e.tagName.match(/^H[1-6]$/) || e.tagName === 'P') {
              content.push(e);
            }
          });
        }
      }
      // CTA Button
      if (child.classList.contains('callToAction')) {
        const a = child.querySelector('a');
        if (a) content.push(a);
      }
      // Ignore spacers and empty elements
    });
    return content;
  }

  const columnCells = columns.map(extractColumnContent);

  // Table header row: block name must match exactly
  const headerRow = ['Columns (columns91)'];
  const tableRows = [headerRow, columnCells];

  // Create table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace element
  element.replaceWith(table);
}
