/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion items container
  const itemsContainer = element.querySelector('.accordionItems');
  if (!itemsContainer) return;

  // Find all accordion__item sections (each is one accordion item)
  const itemSections = Array.from(itemsContainer.querySelectorAll(':scope > section.accordion__item'));

  // Table header: block name only
  const headerRow = ['Accordion (accordion80)'];
  const rows = [headerRow];

  itemSections.forEach((section) => {
    // Title cell: get the <span> inside h3.accordion__header (the label)
    let titleCell = '';
    const header = section.querySelector('h3.accordion__header');
    if (header) {
      const span = header.querySelector('span:last-child');
      titleCell = span ? span.textContent.trim() : header.textContent.trim();
    }

    // Content cell: only the content inside .accordion__content, flattening unnecessary wrappers
    let contentCell = '';
    const contentDiv = section.querySelector('.accordion__content');
    if (contentDiv) {
      // Collect all direct children that are not empty layout wrappers
      const children = Array.from(contentDiv.children).filter((child) => {
        // Remove layout columns, empty divs, and clear:both divs
        if (child.classList.contains('parsys_column')) return false;
        if (child.getAttribute('style') === 'clear:both') return false;
        if (child.tagName === 'DIV' && child.children.length === 0 && child.textContent.trim() === '') return false;
        return true;
      });
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = '';
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
