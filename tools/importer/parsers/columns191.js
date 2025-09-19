/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main image panel section
  const imagePanelSection = element.querySelector('.image-panel-feature');
  if (!imagePanelSection) return;

  // Get the image (if present)
  const img = imagePanelSection.querySelector('img');

  // Get the content wrapper (contains heading and copy)
  const contentWrapper = imagePanelSection.querySelector('.image-panel-feature__content-wrapper');
  if (!contentWrapper) return;

  // Get the heading (if present)
  const heading = contentWrapper.querySelector('.image-panel-feature__title');

  // Get the copy (paragraph)
  const copy = contentWrapper.querySelector('.image-panel-feature__copy');

  // Compose the left column: heading + copy
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (copy) leftCol.appendChild(copy);

  // Compose the right column: image only (if present)
  let rightCol = '';
  if (img) {
    rightCol = img;
  }

  // Build the table rows
  const headerRow = ['Columns (columns191)'];
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
