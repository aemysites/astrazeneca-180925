/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter((c) => c.classList.contains(className));
  }

  // Find the two main columns in the source HTML
  // The structure is: ...parsys_column.l-two-block--offset-left-blank-c0 (left) and ...-c1 (right)
  const columns = Array.from(
    element.querySelectorAll(':scope .parsys_column.l-two-block--offset-left-blank-c0, :scope .parsys_column.l-two-block--offset-left-blank-c1')
  );

  // Defensive: fallback if above selector fails
  let leftCol = columns[0];
  let rightCol = columns[1];

  // If not found, try to look for them as direct children
  if (!leftCol || !rightCol) {
    const allColumns = Array.from(element.querySelectorAll(':scope > div > div > div > .parsys_column'));
    leftCol = leftCol || allColumns[0];
    rightCol = rightCol || allColumns[1];
  }

  // Defensive: if still not found, fallback to the first two parsys_column
  if (!leftCol || !rightCol) {
    const allColumns = Array.from(element.querySelectorAll('.parsys_column'));
    leftCol = leftCol || allColumns[0];
    rightCol = rightCol || allColumns[1];
  }

  // ===== LEFT COLUMN CONTENT =====
  let leftContent = [];
  if (leftCol) {
    // Section header (h2)
    const sectionHeader = leftCol.querySelector('.section-header__header');
    if (sectionHeader) leftContent.push(sectionHeader);

    // Spacer (hr) - optional, usually not needed visually
    // Accordion block
    const accordion = leftCol.querySelector('.accordion.section, .accordion');
    if (accordion) leftContent.push(accordion);
  }

  // ===== RIGHT COLUMN CONTENT =====
  let rightContent = [];
  if (rightCol) {
    // Section header (h3)
    const sectionHeader = rightCol.querySelector('.section-header__header');
    if (sectionHeader) rightContent.push(sectionHeader);

    // Downloads wrapper
    const downloadsWrapper = rightCol.querySelector('.show-more-wrapper__items');
    if (downloadsWrapper) {
      // Each download tile is a child .show-more-wrapper__item
      const downloadItems = Array.from(downloadsWrapper.children);
      rightContent.push(...downloadItems);
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns162)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
