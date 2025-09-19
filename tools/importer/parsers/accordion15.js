/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Accordion (accordion15)'];
  const rows = [headerRow];

  // Title: <h3> with <span> inside
  const headerEl = element.querySelector('h3');
  let titleCell;
  if (headerEl) {
    // Use the <span> inside h3 for the title text (matches screenshot)
    const span = headerEl.querySelector('span:last-child');
    titleCell = span ? span.cloneNode(true) : headerEl.cloneNode(true); // fallback to h3 if no span
  } else {
    titleCell = document.createTextNode('');
  }

  // Content: <div class="accordion__content">
  const contentEl = element.querySelector('.accordion__content');
  let contentCell;
  if (contentEl) {
    // Only include the actual content, not <hr> or spacer divs
    // Find the first .rich-text inside .accordion__content
    const richText = contentEl.querySelector('.rich-text');
    if (richText) {
      contentCell = richText.cloneNode(true);
    } else {
      // fallback: just use the contentEl's textContent
      contentCell = document.createTextNode(contentEl.textContent.trim());
    }
  } else {
    contentCell = document.createTextNode('');
  }

  // Add the accordion item row
  rows.push([titleCell, contentCell]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
