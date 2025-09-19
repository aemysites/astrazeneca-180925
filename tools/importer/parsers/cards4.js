/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all immediate card columns
  const cardCols = Array.from(element.querySelectorAll(':scope > div'));

  cardCols.forEach((col) => {
    const anchor = col.querySelector('a.content-tile');
    if (!anchor) return;
    const img = anchor.querySelector('img');
    const titleDiv = anchor.querySelector('.content-tile__title');
    if (!img || !titleDiv) return;

    // Compose the text cell: title as heading (strong)
    const textCell = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = titleDiv.textContent.trim();
    textCell.appendChild(strong);

    // Try to find a description (any text node or element after the title)
    const contentWrapper = anchor.querySelector('.content-tile__content-wrapper');
    if (contentWrapper) {
      let foundTitle = false;
      for (const node of contentWrapper.childNodes) {
        if (node === titleDiv) {
          foundTitle = true;
          continue;
        }
        if (foundTitle) {
          const desc = (node.textContent || '').trim();
          if (desc) {
            textCell.appendChild(document.createElement('br'));
            textCell.appendChild(document.createTextNode(desc));
          }
        }
      }
    }

    // Each card row: [image, text]
    rows.push([img, textCell]);
  });

  // Only create and replace if there is at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
