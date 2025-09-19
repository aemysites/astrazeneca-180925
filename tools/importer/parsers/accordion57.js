/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row with exactly one column
  const headerRow = ['Accordion (accordion57)'];
  const rows = [headerRow];

  // Find all accordion item sections
  const itemsContainer = element.querySelector('.accordionItems');
  if (!itemsContainer) return;
  const itemSections = Array.from(itemsContainer.querySelectorAll('section.accordion__item'));

  itemSections.forEach((section) => {
    // Title cell: get the header text (inside h3 > span:last-child)
    let title = '';
    const h3 = section.querySelector('h3');
    if (h3) {
      const spans = h3.querySelectorAll('span');
      if (spans.length > 1) {
        title = spans[1].textContent.trim();
      } else {
        title = h3.textContent.trim();
      }
    }
    // Content cell: get the accordion__content div
    let contentCell = '';
    const contentDiv = section.querySelector('.accordion__content');
    if (contentDiv) {
      contentCell = contentDiv;
    }
    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: ensure the header row spans two columns for correct table structure
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }
  // Replace the original element
  element.replaceWith(table);
}
