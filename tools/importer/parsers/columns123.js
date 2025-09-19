/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two direct column containers
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // --- COLUMN 1 ---
  // Collect all non-spacer content (rich text)
  const col1Content = [];
  columns[0].childNodes.forEach((node) => {
    if (node.nodeType === 1 && node.classList.contains('text')) {
      const rich = node.querySelector('.rich-text');
      if (rich) col1Content.push(rich);
    }
  });

  // --- COLUMN 2 ---
  // Collect image and heading
  const col2Content = [];
  columns[1].childNodes.forEach((node) => {
    if (node.nodeType === 1 && node.classList.contains('image')) {
      const img = node.querySelector('img');
      if (img) col2Content.push(img);
    }
    if (node.nodeType === 1 && node.classList.contains('text')) {
      const rich = node.querySelector('.rich-text');
      if (rich) col2Content.push(rich);
    }
  });

  // Only include columns that have content (no unnecessary empty columns)
  const contentRow = [];
  if (col1Content.length) contentRow.push(col1Content);
  if (col2Content.length) contentRow.push(col2Content);
  if (contentRow.length === 0) return;

  // --- TABLE SETUP ---
  const headerRow = ['Columns (columns123)'];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
