/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Column 1: Text content
  // Column 2: Image (with possible video link overlay)
  const col1 = columns[0];
  const col2 = columns[1];

  // --- Column 1: Extract all rich text content ---
  let col1Content = null;
  if (col1) {
    const richText = col1.querySelector('.rich-text');
    if (richText) {
      col1Content = richText;
    } else {
      col1Content = document.createElement('div');
      Array.from(col1.children).forEach(child => col1Content.appendChild(child));
    }
  }

  // --- Column 2: Extract image and video link if present ---
  let col2Content = null;
  if (col2) {
    const imageSection = col2.querySelector('.image.section');
    if (imageSection) {
      const responsiveImage = imageSection.querySelector('.responsive-image');
      if (responsiveImage) {
        const img = responsiveImage.querySelector('img');
        const videoLink = responsiveImage.querySelector('a[href]');
        if (img && videoLink) {
          // Both image and video link
          const col2Div = document.createElement('div');
          col2Div.appendChild(img);
          col2Div.appendChild(videoLink);
          col2Content = col2Div;
        } else if (img) {
          col2Content = img;
        } else if (videoLink) {
          col2Content = videoLink;
        }
      }
    }
  }

  // Only include columns that have content (no unnecessary empty columns)
  const headerRow = ['Columns (columns132)'];
  const contentRow = [];
  if (col1Content) contentRow.push(col1Content);
  if (col2Content) contentRow.push(col2Content);

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
