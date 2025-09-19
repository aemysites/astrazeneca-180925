/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Expect two columns for image and text
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length !== 2) return;

  // --- Image cell ---
  let imageEl = null;
  const imageSection = columns[0].querySelector('.image.section');
  if (imageSection) {
    const img = imageSection.querySelector('img');
    if (img) {
      imageEl = img.cloneNode(true);
    }
  }

  // --- Text cell ---
  let textCellContent = [];
  const quoteSection = columns[1].querySelector('.quote.section');
  if (quoteSection) {
    const blockquote = quoteSection.querySelector('blockquote');
    if (blockquote) {
      // Extract quote text
      const quoteWrapper = blockquote.querySelector('.quote__wrapper p');
      if (quoteWrapper) {
        textCellContent.push(quoteWrapper.cloneNode(true));
      }
      // Extract author and title
      const footer = blockquote.querySelector('footer');
      if (footer) {
        const cite = footer.querySelector('cite');
        if (cite) {
          textCellContent.push(cite.cloneNode(true));
        }
      }
    }
  }

  // --- Table construction ---
  const headerRow = ['Cards (cards102)'];
  const cardRow = [imageEl, textCellContent.length ? textCellContent : ''];
  const rows = [headerRow, cardRow];

  // Replace original element with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  if (table) {
    element.replaceWith(table);
  }
}
