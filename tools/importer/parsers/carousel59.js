/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all carousel slides
  function getSlides(root) {
    // Find all blocks that represent a slide
    return Array.from(
      root.querySelectorAll('.carouselImageSlide, .carouselFullBleedImageSlide')
    );
  }

  // Helper to extract image from slide
  function getImage(slide) {
    // Find the first img inside the slide
    const img = slide.querySelector('img');
    return img || null;
  }

  // Helper to extract text content from slide
  function getTextContent(slide) {
    // Find the section.accordion__item (main content container)
    const section = slide.querySelector('section.accordion__item');
    if (!section) return null;
    // Title
    const header = section.querySelector('h3');
    // Stats (location and status)
    const stats = section.querySelector('.accordion__content-stats-wrapper');
    // All content after stats (including all paragraphs, links, and video CTA)
    let contentNodes = [];
    if (header) contentNodes.push(header.cloneNode(true));
    if (stats) contentNodes.push(stats.cloneNode(true));
    // Collect all nodes after stats
    if (stats) {
      let next = stats.nextSibling;
      while (next) {
        if (next.nodeType === 1) { // Element node
          contentNodes.push(next.cloneNode(true));
        }
        next = next.nextSibling;
      }
    }
    // Defensive: also include any <a> or <div> (video CTA) not already included
    Array.from(section.querySelectorAll('a')).forEach(a => {
      if (!contentNodes.some(n => n.isEqualNode(a))) {
        contentNodes.push(a.cloneNode(true));
      }
    });
    Array.from(section.querySelectorAll('div.carousel-full-bleed__play-video')).forEach(div => {
      if (!contentNodes.some(n => n.isEqualNode(div))) {
        contentNodes.push(div.cloneNode(true));
      }
    });
    // Filter out empty nodes
    contentNodes = contentNodes.filter(node => {
      if (node.tagName === 'P' && !node.textContent.trim()) return false;
      if (node.tagName === 'DIV' && !node.textContent.trim() && node.children.length === 0) return false;
      return true;
    });
    if (!contentNodes.length) return null;
    return contentNodes;
  }

  // Find the main carousel block wrapper
  const blockWrapper = element.querySelector('.carousel-full-bleed');
  if (!blockWrapper) return;

  // Find all slides
  const slides = getSlides(blockWrapper);

  // Compose table rows
  const rows = [];
  // Header row (per guidelines)
  const headerRow = ['Carousel (carousel59)'];
  rows.push(headerRow);

  // For each slide, create a row: [image, text content]
  slides.forEach(slide => {
    const img = getImage(slide);
    const textContent = getTextContent(slide);
    // Only add if image exists (mandatory)
    if (img) {
      // If textContent is array, flatten into cell
      rows.push([
        img,
        textContent && textContent.length ? textContent : ''
      ]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
