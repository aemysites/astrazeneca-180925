/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block: header row, then 2 columns per item (title, content)
  const headerRow = ['Accordion (accordion61)'];
  const rows = [headerRow];

  // Defensive: find the main accordion container (may be nested)
  let accordionRoot = element;
  // Look for the .js-accordion or .accordionItems container
  const jsAccordion = element.querySelector('.js-accordion');
  if (jsAccordion) accordionRoot = jsAccordion;

  // Find all accordion items (sections)
  // Defensive: look for .accordion__item or direct section children
  let itemSections = accordionRoot.querySelectorAll('.accordion__item');
  if (!itemSections.length) {
    itemSections = accordionRoot.querySelectorAll('section');
  }

  itemSections.forEach((section) => {
    // Find the header/title
    let header = section.querySelector('.accordion__header');
    if (!header) {
      // fallback: first h3 or h2
      header = section.querySelector('h3, h2');
    }
    // Defensive: clone the header's text content (strip chevron icon)
    let titleCell;
    if (header) {
      // Remove any icon span
      const headerClone = header.cloneNode(true);
      headerClone.querySelectorAll('span.ui-accordion-header-icon, .accordion__header-chevron--down').forEach((icon) => icon.remove());
      // Use only the text content or span inside header
      let textSpan = headerClone.querySelector('span');
      if (textSpan && textSpan.textContent.trim()) {
        titleCell = document.createElement('div');
        titleCell.textContent = textSpan.textContent.trim();
      } else {
        titleCell = document.createElement('div');
        titleCell.textContent = headerClone.textContent.trim();
      }
    } else {
      titleCell = document.createElement('div');
      titleCell.textContent = '';
    }

    // Find the content area
    let content = section.querySelector('.accordion__content');
    if (!content) {
      // fallback: first div after header
      const divs = section.querySelectorAll('div');
      if (divs.length > 1) content = divs[1];
    }
    let contentCell;
    if (content) {
      // Defensive: use the direct content, not the wrapper
      // If there's a .accordionContent inside, use its children
      const accordionContent = content.querySelector('.accordionContent');
      if (accordionContent) {
        // Use all children of accordionContent
        contentCell = document.createElement('div');
        Array.from(accordionContent.children).forEach(child => contentCell.appendChild(child));
      } else {
        contentCell = document.createElement('div');
        Array.from(content.childNodes).forEach(child => contentCell.appendChild(child));
      }
    } else {
      contentCell = document.createElement('div');
      contentCell.textContent = '';
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
