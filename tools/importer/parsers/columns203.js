/* global WebImporter */
export default function parse(element, { document }) {
  // Get only the two main column divs
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));

  // For each column, collect all non-spacer content sections
  const colCells = columns.map((col) => {
    // Only keep non-spacer sections
    const sections = Array.from(col.children).filter((child) => {
      return !child.classList.contains('spacer');
    });
    // If only one section, use it directly; if multiple, wrap in fragment
    if (sections.length === 1) {
      return sections[0];
    } else if (sections.length > 1) {
      const frag = document.createDocumentFragment();
      sections.forEach((sec) => frag.appendChild(sec));
      return frag;
    } else {
      // Defensive: skip empty columns
      return null;
    }
  }).filter(cell => cell); // Remove any nulls (empty columns)

  // Table structure: header, then one row with N columns
  const headerRow = ['Columns (columns203)'];
  const contentRow = colCells;
  const cells = [headerRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
