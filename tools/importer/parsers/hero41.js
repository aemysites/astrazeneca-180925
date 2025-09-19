/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  let bgImgSrc = null;
  const panel = element.querySelector('.link-image-panel-v2');
  if (panel) {
    const bgAttr = panel.getAttribute('data-hlx-background-image');
    if (bgAttr && bgAttr.startsWith('url(')) {
      bgImgSrc = bgAttr.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    }
    if (!bgImgSrc) {
      const img = panel.querySelector('img');
      if (img) bgImgSrc = img.src;
    }
  }
  let bgImgEl = null;
  if (bgImgSrc) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImgSrc;
    bgImgEl.alt = '';
  }
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row (title, subheading, CTA)
  let contentEls = [];
  if (panel) {
    const link = panel.querySelector('a.link-image-panel-v2__slider');
    if (link) {
      // Try to get all text content inside the link (not just the span)
      const header = link.querySelector('.link-image-panel-v2__header');
      if (header) {
        // Collect all children of the header (h2, etc.)
        Array.from(header.children).forEach(child => {
          // Clone the element and strip classes for cleanliness
          const clone = child.cloneNode(true);
          clone.removeAttribute('class');
          contentEls.push(clone);
        });
      }
      // Add CTA if link has an href and text
      const titleText = link.textContent.trim();
      if (link.href && titleText) {
        const ctaP = document.createElement('p');
        const ctaA = document.createElement('a');
        ctaA.href = link.href;
        ctaA.textContent = titleText;
        ctaP.appendChild(ctaA);
        contentEls.push(ctaP);
      }
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
