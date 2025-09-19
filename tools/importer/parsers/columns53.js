/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // 1. The outer element has two columns: left and right
  const columns = Array.from(element.children); // Should be two: left, right

  // Defensive: if not two columns, fallback to all children as one column
  let leftCol, rightCol;
  if (columns.length === 2) {
    leftCol = columns[0];
    rightCol = columns[1];
  } else {
    leftCol = element;
    rightCol = null;
  }

  // LEFT COLUMN: Jump to section menu
  let leftContent;
  if (leftCol) {
    // Find the jumpTo section
    const jumpSection = leftCol.querySelector('.jumpTo.section, .jump-to.section, .jump-to');
    leftContent = jumpSection ? jumpSection : leftCol;
  }

  // RIGHT COLUMN: Title, description, and paragraph(s)
  let rightContent = [];
  if (rightCol) {
    // Remove any .spacer.section (hr) from rightCol
    const rightColChildren = Array.from(rightCol.children).filter(child => !child.classList.contains('spacer'));
    // Gather all .text.parbase.section > .rich-text
    rightColChildren.forEach(child => {
      const richText = child.querySelector('.rich-text');
      if (richText) rightContent.push(richText);
    });
  }

  // Compose the columns row
  const columnsRow = [
    leftContent,
    rightContent
  ];

  // Build the table
  const headerRow = ['Columns (columns53)'];
  const tableRows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
