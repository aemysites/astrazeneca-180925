/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct column divs
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // --- COLUMN 1: Collect all content from left column, excluding <hr> and empty <div>s ---
  const leftCol = columns[0];
  const leftContent = [];
  leftCol.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      // Exclude <hr> elements and empty divs
      if (node.tagName === 'DIV') {
        // If the div only contains an <hr>, skip it
        if (node.querySelector('hr') && node.children.length === 1) return;
        // If the div is empty, skip it
        if (!node.textContent.trim() && node.children.length === 0) return;
      }
      leftContent.push(node);
    }
  });

  // --- COLUMN 2: Collect all content from right column ---
  const rightCol = columns[1];
  const rightContent = [];
  rightCol.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      rightContent.push(node);
    }
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns193)'];
  const contentRow = [leftContent, rightContent];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
