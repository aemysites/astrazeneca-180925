/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // LEFT COLUMN: Extract all content except spacers, unwrap .rich-text
  let leftColClone = columns[0].cloneNode(true);
  leftColClone.querySelectorAll('.spacer, hr').forEach(e => e.remove());
  let leftContent;
  const richText = leftColClone.querySelector('.rich-text');
  if (richText) {
    leftContent = Array.from(richText.childNodes).filter(node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim()));
    if (leftContent.length === 1) leftContent = leftContent[0];
  } else {
    leftContent = Array.from(leftColClone.childNodes).filter(node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim()));
    if (leftContent.length === 1) leftContent = leftContent[0];
  }

  // RIGHT COLUMN: Prefer image, else all content except spacers, unwrap .rich-text
  let rightColClone = columns[1].cloneNode(true);
  rightColClone.querySelectorAll('.spacer, hr').forEach(e => e.remove());
  let imgEl = rightColClone.querySelector('img');
  let rightContent;
  if (imgEl) {
    rightContent = imgEl;
  } else {
    const rightRichText = rightColClone.querySelector('.rich-text');
    if (rightRichText) {
      rightContent = Array.from(rightRichText.childNodes).filter(node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim()));
      if (rightContent.length === 1) rightContent = rightContent[0];
    } else {
      let children = Array.from(rightColClone.childNodes).filter(node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim()));
      rightContent = children.length === 1 ? children[0] : children;
    }
  }

  // Only output if we have two columns with meaningful content
  if (!leftContent || !rightContent) return;

  const headerRow = ['Columns (columns81)'];
  const contentRow = [leftContent, rightContent];
  const rows = [headerRow, contentRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
