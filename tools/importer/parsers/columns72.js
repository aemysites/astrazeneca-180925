/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column divs (left and right)
  const columnDivs = Array.from(element.children).filter(div => div.classList.contains('parsys_column'));
  if (columnDivs.length < 2) return;

  // Left column: collect all content (not just image)
  const leftCol = columnDivs[0];
  // Collect all direct children as content for left cell
  const leftCellContent = Array.from(leftCol.children).filter(child => {
    // Ignore empty spacers
    if (child.classList.contains('spacer')) return false;
    // Include anything with text, image, or link
    return child.textContent.trim() || child.querySelector('img') || child.querySelector('a');
  });
  // If only one element, use it directly
  const leftCell = leftCellContent.length === 1 ? leftCellContent[0] : leftCellContent;

  // Right column: collect all content
  const rightCol = columnDivs[1];
  const rightCellContent = Array.from(rightCol.children).filter(child => {
    if (child.classList.contains('spacer')) return false;
    return child.textContent.trim() || child.querySelector('img') || child.querySelector('a');
  });
  const rightCell = rightCellContent.length === 1 ? rightCellContent[0] : rightCellContent;

  // Build content row
  const headerRow = ['Columns (columns72)'];
  const contentRow = [leftCell, rightCell];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
