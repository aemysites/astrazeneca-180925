/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the first image in the element (for background)
  function findBackgroundImage(el) {
    // Look for the first <img> inside the element
    const img = el.querySelector('img');
    return img || '';
  }

  // Helper to collect all heading and paragraph content for hero text
  function collectHeroText(el) {
    // Find all .rich-text > h2/h3/h4/p in order
    const nodes = [];
    el.querySelectorAll('.rich-text').forEach(rich => {
      Array.from(rich.children).forEach(child => {
        if (["H1", "H2", "H3", "H4", "P"].includes(child.tagName)) {
          nodes.push(child);
        }
      });
    });
    return nodes.length ? nodes : [''];
  }

  // 1. Header row
  const headerRow = ['Hero (hero182)'];

  // 2. Background image row
  const bgImgRow = [findBackgroundImage(element)];

  // 3. Hero text row
  const heroTextRow = [collectHeroText(element)];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    heroTextRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
