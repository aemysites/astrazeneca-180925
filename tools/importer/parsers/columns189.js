/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns189)'];

  // Get immediate child columns
  const columns = element.querySelectorAll(':scope > div');

  // Extract left column content (quote only, no nested block wrappers)
  let leftColContent = null;
  if (columns[0]) {
    // Only extract the .quote.section inner content (blockquote and footer)
    const quoteSection = columns[0].querySelector('.quote.section');
    if (quoteSection) {
      // Create a fragment with only the blockquote and footer
      const frag = document.createDocumentFragment();
      const blockquote = quoteSection.querySelector('blockquote');
      if (blockquote) frag.appendChild(blockquote.cloneNode(true));
      leftColContent = frag;
    }
  }

  // Extract right column content (image only, no wrappers)
  let rightColContent = null;
  if (columns[1]) {
    const img = columns[1].querySelector('img');
    if (img) {
      rightColContent = img.cloneNode(true);
    }
  }

  // Build content row with only non-empty columns
  const contentRow = [];
  if (leftColContent && leftColContent.childNodes.length) contentRow.push(leftColContent);
  if (rightColContent) contentRow.push(rightColContent);
  if (!contentRow.length) return;

  // Create the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
