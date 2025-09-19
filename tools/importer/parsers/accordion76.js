/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((child) => child.matches(selector));
  }

  // Find the accordion items container
  const accordionItemsContainer = element.querySelector('.accordionItems');
  if (!accordionItemsContainer) return;

  // Get all accordion items (sections)
  const accordionSections = getDirectChildren(accordionItemsContainer, 'section.accordion__item');

  // Build the table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Accordion (accordion76)'];
  rows.push(headerRow);

  accordionSections.forEach((section) => {
    // Title cell: get the header text from the h3
    const header = section.querySelector('h3.accordion__header');
    let titleText = '';
    if (header) {
      // Find the span that contains the actual title
      const titleSpan = header.querySelector('span:last-child');
      if (titleSpan) {
        titleText = titleSpan.textContent.trim();
      } else {
        // fallback: use header text
        titleText = header.textContent.trim();
      }
    }
    // Create a <strong> element for the title (matches screenshot style)
    const titleElem = document.createElement('strong');
    titleElem.textContent = titleText;

    // Content cell: get the accordion__content div
    const contentDiv = section.querySelector('.accordion__content');
    let contentCellElems = [];
    if (contentDiv) {
      // Find the two-column layout
      const twoCol = contentDiv.querySelector('.parsys_column.l-two-block--offset-left');
      if (twoCol) {
        // Left column: text
        const leftCol = twoCol.querySelector('.parsys_column.l-two-block--offset-left-c0');
        if (leftCol) {
          // Find the rich-text div
          const richText = leftCol.querySelector('.rich-text');
          if (richText) {
            contentCellElems.push(richText);
          }
        }
        // Right column: images (may be one or more)
        const rightCol = twoCol.querySelector('.parsys_column.l-two-block--offset-left-c1');
        if (rightCol) {
          // Find all image sections
          const imageSections = rightCol.querySelectorAll('.image.section');
          imageSections.forEach((imgSection) => {
            const img = imgSection.querySelector('img');
            if (img) {
              contentCellElems.push(img);
            }
          });
        }
      }
    }
    // Defensive: if no content, fallback to empty string
    if (contentCellElems.length === 0) {
      contentCellElems = [''];
    }
    rows.push([titleElem, contentCellElems]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
