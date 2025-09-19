/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordionRoot = element.querySelector('.js-accordion, .accordion');
  if (!accordionRoot) return;

  // Find all accordion items (sections)
  const accordionItems = accordionRoot.querySelectorAll(':scope > .accordionItems > section.accordion__item');
  if (!accordionItems.length) return;

  // Table header
  const headerRow = ['Accordion (accordion89)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Get the header (title)
    const header = item.querySelector('.accordion__header');
    let titleCell = '';
    if (header) {
      // Use the last span inside h3 for the title (preserving formatting)
      const span = header.querySelector('span:last-of-type');
      if (span) {
        titleCell = span.cloneNode(true);
      } else {
        // fallback: use textContent
        titleCell = header.textContent.trim();
      }
    }

    // Get the content
    const content = item.querySelector('.accordion__content');
    let contentCell = '';
    if (content) {
      // Only reference the content element itself (preserving all children)
      contentCell = content;
    }

    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
