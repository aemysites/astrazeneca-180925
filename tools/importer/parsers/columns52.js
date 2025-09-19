/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the image panel feature
  const section = element.querySelector('section.image-panel-feature');
  if (!section) return;

  // Get the image (left column)
  const img = section.querySelector('img');
  // Get the right column content
  const contentWrapper = section.querySelector('.image-panel-feature__content-wrapper');
  if (!img || !contentWrapper) return;

  // Compose the right column cell
  const rightCol = document.createElement('div');

  // Extract and append the header/title (if present)
  const header = contentWrapper.querySelector('.image-panel-feature__header');
  if (header) rightCol.appendChild(header);
  // Extract and append the copy/paragraph (if present)
  const copy = contentWrapper.querySelector('.image-panel-feature__copy');
  if (copy) rightCol.appendChild(copy);
  // Extract and append the link (if present)
  const links = contentWrapper.querySelector('.image-panel-feature__links');
  if (links) rightCol.appendChild(links);

  // Build the table rows
  const headerRow = ['Columns (columns52)'];
  const contentRow = [img, rightCol];
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
