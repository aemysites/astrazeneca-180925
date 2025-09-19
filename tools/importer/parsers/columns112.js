/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Helper to extract meaningful content from a column
  function extractContent(col) {
    // If .rich-text exists, use its children
    const richText = col.querySelector('.rich-text');
    if (richText) {
      return Array.from(richText.children).filter(el => {
        if (el.textContent && el.textContent.trim().length > 0) return true;
        if (el.querySelector && el.querySelector('img, picture, video, iframe')) return true;
        return false;
      });
    }
    // Otherwise, use all non-empty elements
    return Array.from(col.children).filter(el => {
      if (el.textContent && el.textContent.trim().length > 0) return true;
      if (el.querySelector && el.querySelector('img, picture, video, iframe')) return true;
      return false;
    });
  }

  // Only include columns with actual content
  let contentRow = [];
  for (const col of columns) {
    const colContent = extractContent(col);
    if (colContent.length > 0) {
      contentRow.push(colContent);
    }
  }

  // Remove any empty columns anywhere in the row
  contentRow = contentRow.filter(colArr => colArr && colArr.length > 0);

  // If less than 2 columns with content, do not create block
  if (contentRow.length < 2) return;

  const headerRow = ['Columns (columns112)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
