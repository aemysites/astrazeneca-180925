/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns (each is a card)
  const columns = element.querySelectorAll(':scope > div');

  // Table header row
  const headerRow = ['Cards (cards54)'];
  const rows = [headerRow];

  columns.forEach((col) => {
    const anchor = col.querySelector('a.content-tile');
    if (!anchor) return;

    // Get image element (mandatory)
    const img = anchor.querySelector('img');
    if (!img) return; // Only include cards with an image

    // Get title element (optional)
    const titleDiv = anchor.querySelector('.content-tile__title');
    let titleText = '';
    if (titleDiv) {
      titleText = titleDiv.textContent.trim();
    }

    // Get description (optional)
    let description = '';
    // Collect all text nodes inside content-tile__content-wrapper except the title
    const contentWrapper = anchor.querySelector('.content-tile__content-wrapper');
    if (contentWrapper) {
      Array.from(contentWrapper.childNodes).forEach((node) => {
        if (node !== titleDiv && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          description += node.textContent.trim() + ' ';
        } else if (node !== titleDiv && node.nodeType === Node.ELEMENT_NODE && node !== titleDiv) {
          description += node.textContent.trim() + ' ';
        }
      });
      description = description.trim();
    }

    // Compose text cell
    const textCell = document.createElement('div');
    if (titleText) {
      const heading = document.createElement('strong');
      heading.textContent = titleText;
      textCell.appendChild(heading);
    }
    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description;
      textCell.appendChild(descP);
    }
    // Fallback: if no title and no description, use anchor text
    if (!titleText && !description && anchor.textContent.trim()) {
      textCell.textContent = anchor.textContent.trim();
    }

    // Only push a single row per card: image | text, and only if both are present
    if (img && (titleText || description || textCell.textContent.trim())) {
      rows.push([
        img,
        textCell
      ]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
