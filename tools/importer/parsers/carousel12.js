/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main carousel block
  let carouselBlock = element.querySelector('.carousel-full-bleed');
  if (!carouselBlock) carouselBlock = element;

  // Find all slide containers (each contains a section.accordion__item)
  let slideSections = Array.from(carouselBlock.querySelectorAll('section.accordion__item'));
  if (!slideSections.length) {
    // Defensive: Try alternate selector
    slideSections = Array.from(carouselBlock.querySelectorAll('.carousel-full-bleed__item-content'));
  }

  // Build table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Carousel (carousel12)'];
  rows.push(headerRow);

  slideSections.forEach((section) => {
    // Get image: inside figure.responsive-image__container img, or from parent slide
    let img = section.querySelector('figure.responsive-image__container img');
    if (!img) {
      // Try to find image in parent div
      const parentDiv = section.closest('div[class*="carousel"]');
      if (parentDiv) {
        img = parentDiv.querySelector('img');
      }
    }
    // Defensive: Try any img inside section
    if (!img) {
      img = section.querySelector('img');
    }
    const imgCell = img ? img : '';

    // Get title: h3.accordion__header or h3.carousel-full-bleed__item-header
    let title = section.querySelector('h3');
    if (!title) title = section.querySelector('.carousel-full-bleed__item-header');
    let titleElem = '';
    if (title && title.textContent.trim().length > 0) {
      titleElem = document.createElement('h2');
      titleElem.textContent = title.textContent.trim();
    }

    // Get all paragraphs (description)
    const paragraphs = Array.from(section.querySelectorAll('p'));
    const descElems = paragraphs.filter(p => p.textContent.trim().length > 0);

    // Get CTA: a.button--primary (if any)
    let cta = section.querySelector('a.button--primary');
    let ctaElem = '';
    if (cta) {
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      ctaElem = a;
    }

    // Compose text cell: title, desc, cta
    const textCell = [];
    if (titleElem) textCell.push(titleElem);
    if (descElems.length) textCell.push(...descElems);
    if (ctaElem) textCell.push(ctaElem);

    rows.push([imgCell, textCell]);
  });

  // If still no rows, try alternate structure: carousel-full-bleed__item-content blocks
  if (rows.length === 1) {
    const altContents = Array.from(carouselBlock.querySelectorAll('.carousel-full-bleed__item-content'));
    altContents.forEach((content) => {
      // Try to find image from sibling .carousel-full-bleed__item
      let img = '';
      const parentItem = content.closest('.carousel-full-bleed__item');
      if (parentItem) {
        img = parentItem.querySelector('img');
      }
      if (!img) img = content.querySelector('img');
      const imgCell = img ? img : '';

      let title = content.querySelector('h3');
      let titleElem = '';
      if (title && title.textContent.trim().length > 0) {
        titleElem = document.createElement('h2');
        titleElem.textContent = title.textContent.trim();
      }
      const paragraphs = Array.from(content.querySelectorAll('p'));
      const descElems = paragraphs.filter(p => p.textContent.trim().length > 0);
      let cta = content.querySelector('a.button--primary');
      let ctaElem = '';
      if (cta) {
        const a = document.createElement('a');
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        ctaElem = a;
      }
      const textCell = [];
      if (titleElem) textCell.push(titleElem);
      if (descElems.length) textCell.push(...descElems);
      if (ctaElem) textCell.push(ctaElem);
      rows.push([imgCell, textCell]);
    });
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
