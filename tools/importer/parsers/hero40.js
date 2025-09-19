/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main section
  const section = element.querySelector('section.hero-feature') || element;

  // 1. HEADER ROW
  const headerRow = ['Hero (hero40)'];

  // 2. BACKGROUND IMAGE ROW
  // Find the background image from .hero-feature__cover img
  let imgCell = '';
  const coverDiv = section.querySelector('.hero-feature__cover');
  if (coverDiv) {
    const img = coverDiv.querySelector('img');
    if (img) {
      imgCell = img;
    }
  }
  const imageRow = [imgCell];

  // 3. CONTENT ROW
  // Find the heading text
  let contentCell = '';
  const wrapperDiv = section.querySelector('.hero-feature__wrapper');
  if (wrapperDiv) {
    // The heading is inside h1.hero-feature__header > div.l-constrained
    const h1 = wrapperDiv.querySelector('h1.hero-feature__header');
    if (h1) {
      const headingDiv = h1.querySelector('.l-constrained');
      if (headingDiv) {
        // CRITICAL FIX: wrap headline in a heading element
        const heading = document.createElement('h1');
        heading.textContent = headingDiv.textContent.trim();
        contentCell = heading;
      }
    }
  }

  const contentRow = [contentCell];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
