/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main column divs
  const columns = Array.from(element.children).filter((el) => el.classList.contains('parsys_column'));
  if (columns.length !== 2) return; // Defensive: must have exactly two columns

  // First column: collect all content blocks
  const firstCol = columns[0];
  // Only include direct children that are content sections
  const firstColContent = Array.from(firstCol.children)
    .filter((el) => el.classList.contains('text'))
    .map((el) => el);

  // Second column: find image (and/or video link)
  const secondCol = columns[1];
  // Find the first image in this column
  const img = secondCol.querySelector('img');
  // Find a video link (if present)
  const videoAnchor = secondCol.querySelector('a[href][data-video-id]');

  // Compose the second column cell
  const secondColCell = [];
  if (img) secondColCell.push(img);
  if (videoAnchor) secondColCell.push(videoAnchor);

  // Compose the table rows
  const headerRow = ['Columns (columns146)'];
  const contentRow = [firstColContent, secondColCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
