/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first direct child matching selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find((el) => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero2)'];

  // 2. Background image row (row 2)
  // Find the <img> inside the <section> (direct child of element)
  let imgEl = null;
  const section = element.querySelector('section');
  if (section) {
    imgEl = section.querySelector('img');
  }
  const bgImgRow = [imgEl ? imgEl : ''];

  // 3. Content row (row 3)
  // Find the content wrapper
  let contentWrapper = null;
  if (section) {
    // There may be a div with class image-panel-feature__content-wrapper (with or without --no-bg)
    contentWrapper = section.querySelector('.image-panel-feature__content-wrapper');
  }
  // Defensive: if not found, try to find the first div after the image
  if (!contentWrapper && section) {
    const divs = section.querySelectorAll('div');
    contentWrapper = Array.from(divs).find(div => div.querySelector('h2') || div.querySelector('p'));
  }
  const contentRow = [contentWrapper ? contentWrapper : ''];

  // Compose the table
  const tableCells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
