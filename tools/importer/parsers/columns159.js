/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Build each column cell by collecting its content
  const columnCells = columns.map((col) => {
    const cellContent = [];
    // Collect all direct children (text, image, etc.)
    Array.from(col.children).forEach((child) => {
      if (child.classList.contains('image')) {
        // Reference the existing image element
        const img = child.querySelector('img');
        if (img) cellContent.push(img);
        // Reference the video link if present
        const videoLink = child.querySelector('a.responsive-image__video-link');
        if (videoLink && videoLink.hasAttribute('href')) {
          // Reference the existing link element
          cellContent.push(videoLink);
        }
      } else {
        // Reference the existing text/rich-text block
        cellContent.push(child);
      }
    });
    // Defensive: If no content, add an empty string
    return cellContent.length ? cellContent : [''];
  });

  // Table structure: header row, then one row with as many columns as found
  const headerRow = ['Columns (columns159)'];
  const tableRows = [headerRow, columnCells];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
