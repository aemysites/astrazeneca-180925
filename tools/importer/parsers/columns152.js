/* global WebImporter */
export default function parse(element, { document }) {
  // Use the required header row
  const headerRow = ['Columns (columns152)'];

  // Only select the three logical columns (not all nested divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // For each column, group all content into a single cell (no empty or duplicate cells)
  const contentRow = columns.map((col) => {
    const cellParts = [];

    // Title (h3)
    const title = col.querySelector('.rich-text h3');
    if (title) cellParts.push(title.cloneNode(true));

    // Image and play overlay (preserve both together)
    const imageSection = col.querySelector('.responsive-image');
    if (imageSection) {
      cellParts.push(imageSection.cloneNode(true));
    }

    // Quote (italic paragraph)
    const quote = col.querySelector('.rich-text p');
    if (quote) cellParts.push(quote.cloneNode(true));

    // Compose cell
    const frag = document.createDocumentFragment();
    cellParts.forEach(part => frag.appendChild(part));
    return frag;
  });

  // Build table: header row, then content row (one cell per logical column)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
