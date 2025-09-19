/* global WebImporter */
export default function parse(element, { document }) {
  // Get the 3 card columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as specified
  const headerRow = ['Cards (cards174)'];
  const rows = [headerRow];

  columns.forEach((col) => {
    // Find image (mandatory)
    let imgEl = null;
    const imageSection = col.querySelector('.image.section');
    if (imageSection) {
      imgEl = imageSection.querySelector('img');
    }

    // Find title (mandatory)
    let titleEl = null;
    const textSection = col.querySelector('.text.parbase.section');
    if (textSection) {
      const richText = textSection.querySelector('.rich-text');
      if (richText) {
        titleEl = richText.querySelector('h3, h2');
      }
    }

    // Only add a card row if it has an image and a title
    if (imgEl && titleEl) {
      rows.push([
        imgEl,
        [titleEl],
      ]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
