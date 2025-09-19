/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column wrappers
  const columns = Array.from(element.querySelectorAll('.parsys_column.l-two-block--offset-right > .parsys_column'));
  const leftCol = columns[0];
  const rightCol = columns[1];

  // --- LEFT COLUMN ---
  // Heading
  const heading = leftCol.querySelector('.rich-text h3');
  // Image
  const imageSection = leftCol.querySelector('.image.section');
  const image = imageSection && imageSection.querySelector('img');
  // Video link (if present)
  const videoLink = imageSection && imageSection.querySelector('a[href]');
  let videoLinkEl;
  if (videoLink) {
    videoLinkEl = document.createElement('a');
    videoLinkEl.href = videoLink.getAttribute('href');
    videoLinkEl.textContent = videoLink.getAttribute('data-video-title') || 'Play video';
    videoLinkEl.setAttribute('aria-label', videoLink.getAttribute('aria-label') || videoLinkEl.textContent);
  }
  // Compose left cell
  const leftCell = document.createElement('div');
  if (heading) leftCell.appendChild(heading.cloneNode(true));
  if (image) leftCell.appendChild(image);
  if (videoLinkEl) leftCell.appendChild(videoLinkEl);

  // --- RIGHT COLUMN ---
  const quoteSection = rightCol.querySelector('.quote.section');
  const blockquote = quoteSection && quoteSection.querySelector('blockquote');
  const rightCell = document.createElement('div');
  if (blockquote) rightCell.appendChild(blockquote.cloneNode(true));

  // Build table
  const headerRow = ['Columns (columns103)'];
  const contentRow = [leftCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
