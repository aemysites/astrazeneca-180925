/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  // Collect all content from left column (text blocks)
  const leftCol = columns[0];
  const leftContent = [];
  leftCol.querySelectorAll('.text.parbase.section').forEach((block) => {
    leftContent.push(block);
  });

  // --- RIGHT COLUMN ---
  // Find the image block (and possible video link)
  const rightCol = columns[1];
  const rightContent = [];
  const imageSection = rightCol.querySelector('.image.section');
  if (imageSection) {
    // Reference the actual <img> element
    const img = imageSection.querySelector('img');
    if (img) rightContent.push(img);
    // If there is a video link (not an image), add as a link
    const videoLink = imageSection.querySelector('a[href]');
    if (videoLink && videoLink.getAttribute('href')) {
      rightContent.push(videoLink);
    }
  }

  // Always output two columns for this layout, even if one is empty
  const contentRow = [leftContent.length ? leftContent : '', rightContent.length ? rightContent : ''];

  const headerRow = ['Columns (columns19)'];
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
