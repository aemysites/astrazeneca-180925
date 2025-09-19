/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column containing the accordion
  const leftCol = element.querySelector('.l-two-block--offset-left-blank-c0');
  if (!leftCol) return;

  // Find the accordion section
  const accordionSection = leftCol.querySelector('.accordion.section');
  if (!accordionSection) return;

  // Find all accordion items (sections)
  const itemsContainer = accordionSection.querySelector('.accordionItems');
  if (!itemsContainer) return;

  const itemSections = itemsContainer.querySelectorAll(':scope > section.accordion__item');

  // Build the table rows
  const rows = [];
  // Header row as required (EXACTLY one column)
  rows.push(['Accordion (accordion37)']);

  itemSections.forEach(section => {
    // Title cell: get the h3, use the span inside for clean text (preserves formatting if any)
    const header = section.querySelector('.accordion__header');
    let titleContent = '';
    if (header) {
      const span = header.querySelector('span:last-of-type');
      titleContent = span ? span.textContent.trim() : header.textContent.trim();
    }

    // Content cell: get the accordion__content
    const content = section.querySelector('.accordion__content');
    let contentCell = '';
    if (content) {
      const accordionContent = content.querySelector('.accordionContent');
      if (accordionContent) {
        // Try to preserve list structure if present
        // If there are <ul> or <ol> inside, keep them as is
        // If not, try to convert bullet-like paragraphs to <ul><li>
        const nodes = Array.from(accordionContent.childNodes);
        // Special handling for RDQ: convert bullet paragraphs to <ul><li>
        if (nodes.length && nodes.some(n => n.nodeType === 1 && n.textContent.match(/^•|^\u2022/))) {
          const ul = document.createElement('ul');
          nodes.forEach(n => {
            if (n.nodeType === 1 && n.textContent.match(/^•|^\u2022/)) {
              const li = document.createElement('li');
              li.innerHTML = n.innerHTML.replace(/^•\s*/, '');
              ul.appendChild(li);
            } else if (n.nodeType === 1 && n.tagName === 'P' && n.textContent.trim() === '') {
              // skip empty
            } else {
              ul.appendChild(n.cloneNode(true));
            }
          });
          contentCell = [ul];
        } else {
          contentCell = nodes;
        }
      } else {
        contentCell = Array.from(content.childNodes);
      }
    }
    if (!Array.isArray(contentCell)) contentCell = [contentCell];

    rows.push([
      titleContent,
      contentCell
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
