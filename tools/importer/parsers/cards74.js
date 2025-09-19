/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards74)'];
  const rows = [headerRow];
  const columns = element.querySelectorAll(':scope > div');
  columns.forEach(col => {
    const anchor = col.querySelector('a.wscd-split-feature-tile');
    if (!anchor) return;
    const img = anchor.querySelector('img');
    const contentWrapper = anchor.querySelector('.wscd-split-feature-tile__content-wrapper');
    if (!img || !contentWrapper) return;
    const frag = document.createElement('div');
    const titleDiv = contentWrapper.querySelector('.wscd-split-feature-tile__title');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      frag.appendChild(strong);
    }
    const descDiv = contentWrapper.querySelector('.rich-text');
    if (descDiv) {
      if (titleDiv && descDiv.textContent.trim()) {
        frag.appendChild(document.createElement('br'));
      }
      Array.from(descDiv.childNodes).forEach(node => {
        frag.appendChild(node.cloneNode(true));
      });
    }
    // Only add row if both image and text content are present (no empty cells)
    if (img && frag.childNodes.length > 0) {
      rows.push([img, frag]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
