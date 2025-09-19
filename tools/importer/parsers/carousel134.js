/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel block header row
  const headerRow = ['Carousel (carousel134)'];

  // Find all panels (each is a slide)
  const panels = Array.from(element.querySelectorAll(':scope > div'));

  // Collect slide rows
  const rows = [];

  panels.forEach((panel) => {
    // Find the main image (first img in panel or descendant)
    const img = panel.querySelector('img');
    let imageCell = img;

    // Find the link panel (contains title and CTA)
    const linkPanel = panel.querySelector('a.link-image-panel-v2__slider');
    let textCellContent = [];

    if (linkPanel) {
      // Title (h2 or span)
      const titleSpan = linkPanel.querySelector('.link-image-panel-v2__title-decoration');
      if (titleSpan && titleSpan.textContent.trim()) {
        const heading = document.createElement('h2');
        heading.textContent = titleSpan.textContent.trim();
        textCellContent.push(heading);
      }
      // Description: try to find any paragraph or additional text inside the wrapper
      const wrapper = linkPanel.querySelector('.link-image-panel-v2__wrapper');
      if (wrapper) {
        // Get all text nodes that are not inside the title
        Array.from(wrapper.childNodes).forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textCellContent.push(p);
          }
        });
      }
      // CTA: Use the link itself if it has text
      if (linkPanel.href && linkPanel.textContent.trim()) {
        const ctaLink = document.createElement('a');
        ctaLink.href = linkPanel.href;
        ctaLink.textContent = linkPanel.textContent.trim();
        textCellContent.push(ctaLink);
      }
    }
    // If no text content, leave cell empty
    const textCell = textCellContent.length ? textCellContent : '';

    rows.push([imageCell, textCell]);
  });

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
