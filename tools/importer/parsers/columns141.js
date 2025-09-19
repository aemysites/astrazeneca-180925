/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns141)'];

  // Get immediate column children (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // LEFT COLUMN (all text sections as one column)
  const leftCol = columnDivs[0];
  const leftTextSections = Array.from(leftCol.querySelectorAll(':scope > div.text'));
  // Place all left text sections in a single cell (as a fragment)
  const leftColFragment = document.createDocumentFragment();
  leftTextSections.forEach(sec => leftColFragment.appendChild(sec.cloneNode(true)));

  // RIGHT COLUMN (button or call to action as one column)
  const rightCol = columnDivs[1];
  let rightColContent = null;
  const callToAction = rightCol.querySelector('.callToAction');
  if (callToAction) {
    rightColContent = callToAction.cloneNode(true);
  } else {
    const button = rightCol.querySelector('a.button, button');
    if (button) rightColContent = button.cloneNode(true);
  }

  // Only include columns with actual content (no empty columns)
  const contentRow = [];
  if (leftColFragment.childNodes.length > 0) contentRow.push(leftColFragment);
  if (rightColContent) contentRow.push(rightColContent);

  // If both columns are empty, do not output a block
  if (contentRow.length === 0) return;

  const rows = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
