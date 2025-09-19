/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const columnsParent = element.querySelector('.parsys_column.l-two-block--padded');
  if (!columnsParent) return;
  const columnDivs = columnsParent.querySelectorAll(':scope > .parsys_column');
  if (columnDivs.length < 2) return;

  // LEFT COLUMN: Jump-to section
  const leftCol = columnDivs[0];
  const jumpTo = leftCol.querySelector('.jump-to');
  let leftColContent;
  if (jumpTo) {
    leftColContent = document.createElement('div');
    // Heading
    const heading = jumpTo.querySelector('h3');
    if (heading) leftColContent.appendChild(heading);
    // List
    const ul = jumpTo.querySelector('ul');
    if (ul) leftColContent.appendChild(ul);
  } else {
    // fallback: use all children
    leftColContent = document.createElement('div');
    Array.from(leftCol.children).forEach(child => leftColContent.appendChild(child));
  }

  // RIGHT COLUMN: Rich text + image (video thumbnail)
  const rightCol = columnDivs[1];
  const rightColContent = document.createElement('div');
  // Rich text
  const richText = rightCol.querySelector('.rich-text');
  if (richText) {
    Array.from(richText.childNodes).forEach(node => rightColContent.appendChild(node.cloneNode(true)));
  }
  // Image (video thumbnail)
  const img = rightCol.querySelector('.image.section img');
  if (img) {
    rightColContent.appendChild(img);
  }

  // Table structure
  const headerRow = ['Columns (columns185)'];
  const contentRow = [leftColContent, rightColContent];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
