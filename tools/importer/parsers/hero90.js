/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the background image
  function getBackgroundImageEl() {
    const bgImg = element.querySelector('.carousel-full-bleed__carousels .carousel-full-bleed__background img');
    if (bgImg) return bgImg;
    const fallbackImg = element.querySelector('img');
    return fallbackImg || null;
  }

  // Helper to get the main content (title, paragraphs, CTA)
  function getContentEl() {
    let content = element.querySelector('.carousel-full-bleed__carousels .carousel-full-bleed__foreground .carousel-full-bleed__item-content');
    if (!content) {
      content = element.querySelector('.accordion__content.carousel-full-bleed__item-content');
    }
    return content || null;
  }

  // Helper to extract CTA link (Play video)
  function getCTAEl(contentEl) {
    if (!contentEl) return null;
    let cta = contentEl.querySelector('.carousel-full-bleed__play-video a');
    if (!cta) {
      cta = Array.from(contentEl.querySelectorAll('a')).find(a => a.textContent.trim().toLowerCase().includes('play video'));
    }
    return cta || null;
  }

  // Build table rows
  const headerRow = ['Hero (hero90)'];

  // Row 2: background image
  const bgImgEl = getBackgroundImageEl();
  const bgImgRow = [bgImgEl ? bgImgEl : ''];

  // Row 3: content (title, subheading, CTA)
  const contentEl = getContentEl();
  let contentChildren = [];
  if (contentEl) {
    // Collect all content nodes in order, not just h3/p/a
    Array.from(contentEl.childNodes).forEach(node => {
      // Only include element nodes and text nodes with actual content
      if (node.nodeType === 1) {
        // For elements, push as-is
        contentChildren.push(node);
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // For text nodes, wrap in a span
        const span = document.createElement('span');
        span.textContent = node.textContent;
        contentChildren.push(span);
      }
    });
    // Add CTA if not already present
    const cta = getCTAEl(contentEl);
    if (cta && !contentChildren.includes(cta)) contentChildren.push(cta);
  }
  const contentRow = [contentChildren.length ? contentChildren : ''];

  // Create table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
