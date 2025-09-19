/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct block name as the header row
  const headerRow = ['Cards (cards82)'];
  const rows = [headerRow];

  // Find all three-block columns (these are the card containers)
  const columns = element.querySelectorAll(':scope > div');

  columns.forEach((col) => {
    // Look for the card panel inside this column
    const cardPanel = col.querySelector('.linkImagePanelV2');
    if (!cardPanel) return; // skip empty columns

    // Find the main wrapper for the card
    const wrapper = cardPanel.querySelector('.link-image-panel-v2');
    if (!wrapper) return;

    // Get the main image (first <img> inside wrapper)
    const img = wrapper.querySelector('img');
    if (!img) return;

    // Get the link (CTA) and its content
    const link = wrapper.querySelector('a.link-image-panel-v2__slider');
    let title = '';
    let description = '';
    if (link) {
      // Try to find the title inside the link
      const titleEl = link.querySelector('.link-image-panel-v2__title');
      if (titleEl) {
        title = titleEl.textContent.trim();
      }
      // Try to find description below the title
      // Look for any text nodes or elements after the title
      const headerDiv = link.querySelector('.link-image-panel-v2__header');
      if (headerDiv) {
        let sibling = headerDiv.nextSibling;
        while (sibling) {
          if (sibling.nodeType === Node.TEXT_NODE) {
            description += sibling.textContent.trim();
          } else if (sibling.nodeType === Node.ELEMENT_NODE) {
            description += sibling.textContent.trim();
          }
          sibling = sibling.nextSibling;
        }
      }
    }
    // Fallback: try to get description from wrapper if not found above
    if (!description) {
      const descEl = wrapper.querySelector('.link-image-panel-v2__description');
      if (descEl) {
        description = descEl.textContent.trim();
      }
    }

    // Build the text content cell
    const textCell = document.createElement('div');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      textCell.appendChild(h2);
    }
    if (description) {
      const p = document.createElement('p');
      p.textContent = description;
      textCell.appendChild(p);
    }
    if (link && link.href) {
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = title || link.href;
      textCell.appendChild(cta);
    }

    // Only add the row if we have an image and some text content
    if (img && textCell.childNodes.length) {
      rows.push([img, textCell]);
    }
  });

  // Only create the table if there are cards
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
