/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child sections (accordion items)
  function getAccordionSections(el) {
    let itemsContainer = el.querySelector('.accordionItems');
    if (!itemsContainer) {
      return Array.from(el.querySelectorAll('section.accordion__item'));
    }
    return Array.from(itemsContainer.children).filter(child => child.tagName === 'SECTION');
  }

  // Find the main accordion element within the block
  let accordionRoot = element.querySelector('.accordion.section, .accordion');
  if (!accordionRoot) {
    accordionRoot = element.querySelector('.js-accordion');
  }
  if (!accordionRoot) {
    return;
  }

  // Table header row: exactly one column per spec
  const headerRow = ['Accordion (accordion160)'];
  const rows = [headerRow];

  // Get all accordion items (sections)
  const sections = getAccordionSections(accordionRoot);

  sections.forEach((section) => {
    // Title cell: find the header (h3) and use its text content
    let header = section.querySelector('.accordion__header');
    let titleCell;
    if (header) {
      const span = header.querySelector('span:last-child');
      if (span) {
        const strong = document.createElement('strong');
        strong.textContent = span.textContent.trim();
        titleCell = strong;
      } else {
        titleCell = document.createTextNode(header.textContent.trim());
      }
    } else {
      titleCell = document.createTextNode(section.textContent.trim());
    }

    // Content cell: find the content div
    let contentDiv = section.querySelector('.accordion__content');
    let contentCell;
    if (contentDiv) {
      // Use all children of contentDiv (preserving structure)
      const contentNodes = Array.from(contentDiv.children).filter(child => child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE');
      if (contentNodes.length === 1) {
        contentCell = contentNodes[0].cloneNode(true);
      } else if (contentNodes.length > 1) {
        // If multiple, wrap in a div
        const wrapper = document.createElement('div');
        contentNodes.forEach(node => wrapper.appendChild(node.cloneNode(true)));
        contentCell = wrapper;
      } else {
        // fallback to textContent
        contentCell = contentDiv.textContent.trim();
      }
    } else {
      contentCell = '';
    }

    // Each row must be an array of two cells
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
