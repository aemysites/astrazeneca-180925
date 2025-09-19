/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by class name
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(el => el.classList.contains(className));
  }

  // 1. Get the three main content wrappers
  const iconWrapper = getChildByClass(element, 'publications-list__icon-wrapper');
  const bodyWrapper = getChildByClass(element, 'publications-list__body-wrapper');
  const metaWrapper = getChildByClass(element, 'publications-list__meta-wrapper');

  // 2. Compose left/main column: icon + body
  const leftCol = document.createElement('div');
  if (iconWrapper) leftCol.appendChild(iconWrapper);
  if (bodyWrapper) leftCol.appendChild(bodyWrapper);

  // 3. Compose right column: meta (related content)
  let rightCol = null;
  if (metaWrapper) {
    rightCol = document.createElement('div');
    rightCol.appendChild(metaWrapper);
  }

  // 4. Build rows array
  const headerRow = ['Columns (columns30)'];
  const contentRow = rightCol ? [leftCol, rightCol] : [leftCol];
  const rows = [headerRow, contentRow];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
