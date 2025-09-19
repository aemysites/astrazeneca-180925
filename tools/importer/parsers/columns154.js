/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers
  const columns = Array.from(element.children);
  if (columns.length < 2) return;

  // --- Column 1: Text ---
  const col1 = columns[0];
  // Collect all text content from column 1, excluding <hr> elements
  const col1Fragments = [];
  Array.from(col1.children).forEach((section) => {
    if (section.classList.contains('text')) {
      const rich = section.querySelector('.rich-text');
      if (rich) col1Fragments.push(rich);
    }
    // Do NOT include <hr> elements
  });
  // Defensive: if nothing found, fallback to col1
  const col1Content = col1Fragments.length ? col1Fragments : [col1];

  // --- Column 2: Image ---
  const col2 = columns[1];
  let imgEl = '';
  const imgSection = col2.querySelector('.image');
  if (imgSection) {
    const img = imgSection.querySelector('img');
    if (img) imgEl = img;
  }

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns154)'];
  const contentRow = [col1Content, imgEl];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}
