/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: image only
  const col0 = columns[0];
  const image = col0.querySelector('img');

  // Second column: collect all visible content (quote, author, title)
  const col1 = columns[1];
  const quoteSection = col1.querySelector('.quote');
  let col1Content = [];
  if (quoteSection) {
    // Get the blockquote text
    const blockquote = quoteSection.querySelector('blockquote');
    if (blockquote) {
      // Collect the quote text
      const quoteText = blockquote.querySelector('.quote__wrapper');
      if (quoteText) col1Content.push(quoteText);
      // Collect the footer (author and title)
      const footer = blockquote.querySelector('footer');
      if (footer) col1Content.push(footer);
    } else {
      col1Content.push(quoteSection);
    }
  }

  // Only include columns with actual content
  const contentRow = [];
  if (image) contentRow.push(image);
  if (col1Content.length) contentRow.push(col1Content);
  if (contentRow.length === 0) return;

  const headerRow = ['Columns (columns24)'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
