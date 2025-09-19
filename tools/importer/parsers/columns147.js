/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column divs
  const columns = Array.from(element.children);
  if (columns.length < 2) return;

  // --- COLUMN 1: Image ---
  let imageCell = '';
  const imgSection = columns[0].querySelector('.image.section');
  if (imgSection) {
    const img = imgSection.querySelector('img');
    if (img) imageCell = img;
  }

  // --- COLUMN 2: Heading + Paragraph ---
  let textCell = '';
  const richTextSections = Array.from(columns[1].querySelectorAll('.rich-text'));
  if (richTextSections.length) {
    // Collect all heading and paragraph nodes
    const nodes = [];
    richTextSections.forEach(rt => {
      const h2 = rt.querySelector('h2');
      if (h2) nodes.push(h2);
      const p = rt.querySelector('p');
      if (p) nodes.push(p);
    });
    if (nodes.length) textCell = nodes;
  }

  // --- Table Construction ---
  const headerRow = ['Columns (columns147)'];
  const row = [imageCell, textCell];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
