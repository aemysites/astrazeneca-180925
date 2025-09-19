/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion items (sections)
  const accordionItems = element.querySelectorAll(':scope .accordion__item.section');

  // Build header row
  const headerRow = ['Accordion (accordion42)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: get the header text (usually in h3 > span:last-child)
    let title = '';
    const header = item.querySelector('.accordion__header');
    if (header) {
      const spans = header.querySelectorAll('span');
      if (spans.length > 1) {
        title = spans[1].textContent.trim();
      } else {
        title = header.textContent.trim();
      }
    }
    const titleElem = document.createElement('div');
    titleElem.textContent = title;
    titleElem.style.fontWeight = 'bold';

    // Content cell: get the accordion__content
    const content = item.querySelector('.accordion__content');
    let contentElem = document.createElement('div');
    if (content) {
      // Only extract direct block-level elements, and FLATTEN any tables to their text content (row by row)
      Array.from(content.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'table') {
          // Flatten table: extract each row's text as a paragraph
          Array.from(child.querySelectorAll('tr')).forEach((tr) => {
            const rowText = Array.from(tr.cells).map(cell => cell.innerText.trim()).filter(Boolean).join(' | ');
            if (rowText) {
              const p = document.createElement('p');
              p.textContent = rowText;
              contentElem.appendChild(p);
            }
          });
        } else {
          contentElem.appendChild(child.cloneNode(true));
        }
      });
    }
    rows.push([titleElem, contentElem]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
