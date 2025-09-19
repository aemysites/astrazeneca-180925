/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract slide info from carousel-full-bleed__block
  function getSlidesFromBlock(carouselBlock) {
    const slides = [];
    const slideDivs = carouselBlock.querySelectorAll(':scope > div');
    slideDivs.forEach((slideDiv) => {
      // Each slideDiv contains a section.accordion__item
      const section = slideDiv.querySelector('section.accordion__item');
      if (!section) return;
      // Get image
      let img = null;
      const figure = section.querySelector('figure');
      if (figure) {
        img = figure.querySelector('img');
      }
      // Get text content
      const contentDiv = section.querySelector('.accordion__content');
      let textContent = [];
      // Title (from h3 in section, not in contentDiv)
      const h3 = section.querySelector('h3');
      if (h3) textContent.push(h3.cloneNode(true));
      if (contentDiv) {
        // All direct children except figure
        Array.from(contentDiv.childNodes).forEach(node => {
          // skip figure
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'figure') return;
          // skip empty ul
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'ul' && node.children.length === 0) return;
          // include all other elements and text
          if (
            (node.nodeType === 1 && node.tagName.toLowerCase() !== 'figure') ||
            (node.nodeType === 3 && node.textContent.trim() !== '')
          ) {
            textContent.push(node.cloneNode(true));
          }
        });
      }
      // Only add slide if image exists
      if (img) {
        slides.push([img.cloneNode(true), textContent.length ? textContent : '']);
      }
    });
    return slides;
  }

  // Find the carousel block in the element
  const carouselBlock = element.querySelector('.carousel-full-bleed__block');
  // Defensive: fallback to .accordion if not found
  const block = carouselBlock || element.querySelector('.accordion');
  if (!block) return;

  // Build table rows
  const headerRow = ['Carousel (carousel117)'];
  const rows = [headerRow];
  const slides = getSlidesFromBlock(block);
  slides.forEach(([img, textContent]) => {
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
