/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get background image URL from section style
  function getBackgroundImageUrl(section) {
    if (!section || !section.style) return null;
    const bg = section.style.backgroundImage;
    if (bg && bg !== 'none') {
      const match = bg.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match) return match[1];
    }
    return null;
  }

  // Helper to get the best image for the background
  function getBackgroundImage(section) {
    const bgUrl = getBackgroundImageUrl(section);
    if (bgUrl) {
      const img = document.createElement('img');
      img.src = bgUrl;
      return img;
    }
    // Try all <img> in section, prefer largest
    const imgs = Array.from(section.querySelectorAll('img'));
    if (imgs.length > 0) {
      // Prefer largest image by width if possible
      let maxImg = imgs[0];
      let maxWidth = parseInt(maxImg.width || maxImg.naturalWidth || 0, 10);
      imgs.forEach((im) => {
        const w = parseInt(im.width || im.naturalWidth || 0, 10);
        if (w > maxWidth) {
          maxImg = im;
          maxWidth = w;
        }
      });
      return maxImg;
    }
    return null;
  }

  // Helper to get all content from .rich-header__content
  function getContent(section) {
    const content = section.querySelector('.rich-header__content');
    if (!content) return null;
    // Clone to avoid moving nodes
    return content.cloneNode(true);
  }

  // Find the <section class="rich-header"> inside the block
  const section = element.querySelector('section.rich-header');
  if (!section) return;

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  const bgImg = getBackgroundImage(section);
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: include all content from .rich-header__content (title, subheading, etc)
  const contentBlock = getContent(section);
  const contentRow = [contentBlock ? contentBlock.childNodes.length ? Array.from(contentBlock.childNodes) : '' : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
