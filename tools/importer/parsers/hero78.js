/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image (row 2)
  function findBackgroundImage() {
    // Try to find the largest image in carousel background
    const bgImg = element.querySelector('.carousel-full-bleed__carousels .carousel-full-bleed__background img');
    if (bgImg) return bgImg.cloneNode(true);
    // Fallback: try to find any img in the block
    const imgs = element.querySelectorAll('img');
    if (imgs.length > 0) return imgs[imgs.length - 1].cloneNode(true);
    return '';
  }

  // Helper to find the content area (row 3)
  function findContentArea() {
    // Prefer the foreground carousel content
    const fg = element.querySelector('.carousel-full-bleed__carousels .carousel-full-bleed__foreground .carousel-full-bleed__item-content');
    if (fg) return fg;
    // Fallback: accordion content
    const accordionContent = element.querySelector('.accordion__content.carousel-full-bleed__item-content');
    if (accordionContent) return accordionContent;
    // Fallback: any .carousel-full-bleed__item-content
    const anyContent = element.querySelector('.carousel-full-bleed__item-content');
    if (anyContent) return anyContent;
    return null;
  }

  // Extracts all relevant text and CTA from the content area
  function extractContent(contentArea) {
    if (!contentArea) return '';
    const fragment = document.createElement('div');
    // Heading (h1, h2, h3)
    const heading = contentArea.querySelector('h1, h2, h3, .accordion__header');
    if (heading) {
      fragment.appendChild(heading.cloneNode(true));
    }
    // Paragraph(s)
    contentArea.querySelectorAll('p').forEach((p) => {
      fragment.appendChild(p.cloneNode(true));
    });
    // CTA (button or link)
    const cta = contentArea.querySelector('a.button, a');
    if (cta) {
      fragment.appendChild(cta.cloneNode(true));
    }
    return fragment.childNodes.length ? fragment : '';
  }

  const headerRow = ['Hero (hero78)'];
  const bgImg = findBackgroundImage();
  const imageRow = [bgImg ? bgImg : ''];
  const contentArea = findContentArea();
  const contentRow = [extractContent(contentArea)];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
