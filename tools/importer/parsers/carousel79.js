/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Carousel (carousel79)'];

  // Find all .linkImagePanelV2.section blocks (each is a slide)
  const slides = Array.from(element.querySelectorAll('.linkImagePanelV2.section'));

  // Defensive: If no slides found, try .link-image-panel-v2 directly
  const fallbackSlides = slides.length ? slides : Array.from(element.querySelectorAll('.link-image-panel-v2'));

  // Build rows for each slide
  const rows = fallbackSlides.map(slideSection => {
    // Find the main image (first img inside .link-image-panel-v2)
    const panel = slideSection.querySelector('.link-image-panel-v2') || slideSection;
    const img = panel.querySelector('img');
    const imageCell = img || '';

    // Find the text content
    let textCell = '';
    // The text is inside the link-image-panel-v2__wrapper (inside <a>), or in the title span
    const link = panel.querySelector('a.link-image-panel-v2__slider');
    if (link) {
      // Title
      const titleSpan = link.querySelector('.link-image-panel-v2__title-decoration');
      let title = '';
      if (titleSpan && titleSpan.textContent.trim()) {
        const h2 = document.createElement('h2');
        h2.textContent = titleSpan.textContent.trim();
        title = h2;
      }
      // Compose cell
      textCell = [];
      if (title) textCell.push(title);
      // No additional description or CTA in this HTML
      if (textCell.length === 0) textCell = '';
    }
    return [imageCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
