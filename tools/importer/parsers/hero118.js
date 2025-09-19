/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main hero panel
  const panel = element.querySelector('.linkImagePanelV2.section .link-image-panel-v2');
  if (!panel) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero118)'];

  // --- ROW 2: Background Image ---
  // Extract background image from data-hlx-background-image
  let bgImgSrc = panel.getAttribute('data-hlx-background-image');
  if (bgImgSrc) {
    const urlMatch = bgImgSrc.match(/url\(["']?([^"')]+)["']?\)/);
    bgImgSrc = urlMatch ? urlMatch[1] : '';
  }
  // Fallback: use first <img> in panel if no data-hlx-background-image
  let imgEl = null;
  if (bgImgSrc) {
    imgEl = document.createElement('img');
    imgEl.src = bgImgSrc;
    // Do NOT use alt from data attributes; only if present on original image
    const origImg = panel.querySelector('img');
    if (origImg && origImg.getAttribute('alt')) {
      imgEl.alt = origImg.getAttribute('alt');
    }
  } else {
    imgEl = panel.querySelector('img');
  }
  const imgRow = [imgEl ? imgEl : ''];

  // --- ROW 3: Content (title, subtitle, CTA, paragraph) ---
  // Find the wrapper containing text content
  const wrapper = panel.querySelector('.link-image-panel-v2__wrapper');
  const contentEls = [];
  if (wrapper) {
    // Title (h2)
    const title = wrapper.querySelector('.link-image-panel-v2__title');
    if (title) contentEls.push(title);
    // Subtitle (p)
    const subtitle = wrapper.querySelector('.link-image-panel-v2__subtitle');
    if (subtitle) contentEls.push(subtitle);
    // CTA: If the parent <a> exists, wrap subtitle in a link
    const ctaLink = panel.querySelector('a.link-image-panel-v2__slider');
    if (ctaLink && subtitle) {
      const cta = document.createElement('a');
      cta.href = ctaLink.href;
      cta.innerHTML = subtitle.innerHTML;
      contentEls.push(cta);
    }
    // Paragraph (main content)
    const paragraph = wrapper.querySelector('.link-image-panel-v2__content');
    if (paragraph) contentEls.push(paragraph);
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // --- Assemble Table ---
  const cells = [
    headerRow,
    imgRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
