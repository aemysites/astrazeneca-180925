/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  const getImmediateChildren = (parent, selector) => {
    return Array.from(parent.children).filter(el => el.matches(selector));
  };

  // Find the two main columns (left and right)
  // The structure is: ... wrapperPar > parsys_column.l-two-block--padded > [col0, col1]
  const wrapperPar = element.querySelector('.wrapperPar');
  if (!wrapperPar) return;
  const twoBlock = wrapperPar.querySelector('.parsys_column.l-two-block--padded');
  if (!twoBlock) return;
  const columns = twoBlock.querySelectorAll(':scope > .parsys_column');
  if (columns.length < 2) return;

  // Left column: jump-to section
  const leftCol = columns[0];
  // Right column: heading and text
  const rightCol = columns[1];

  // Defensive: find the jump-to section in leftCol
  let jumpToSection = null;
  for (const child of leftCol.children) {
    if (child.classList.contains('jumpTo') || child.classList.contains('jump-to')) {
      jumpToSection = child;
      break;
    }
    // Sometimes the .jump-to is nested
    const jt = child.querySelector('.jump-to');
    if (jt) {
      jumpToSection = child;
      break;
    }
  }
  if (!jumpToSection) {
    // fallback: just use the leftCol
    jumpToSection = leftCol;
  }

  // For the right column, collect all .text.parbase.section blocks
  const rightContentBlocks = Array.from(rightCol.querySelectorAll('.text.parbase.section'));
  // We'll append all their .rich-text children
  const rightContent = [];
  rightContentBlocks.forEach(block => {
    const rich = block.querySelector('.rich-text');
    if (rich) rightContent.push(rich);
  });

  // If nothing found, fallback to rightCol
  if (rightContent.length === 0) rightContent.push(rightCol);

  // Build the table rows
  const headerRow = ['Columns (columns144)'];
  const contentRow = [jumpToSection, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
