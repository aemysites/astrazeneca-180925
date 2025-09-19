/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get immediate column children
  const columns = Array.from(element.children);
  if (columns.length !== 2) return;

  // First column: image (with play overlay)
  let firstColContent = [];
  const imageSection = columns[0].querySelector('.image.section');
  if (imageSection) {
    const responsiveImage = imageSection.querySelector('.responsive-image');
    if (responsiveImage) {
      const img = responsiveImage.querySelector('img');
      if (img) {
        firstColContent.push(img.cloneNode(true));
      }
      // Only add the video overlay if it exists and is visible
      const videoLink = responsiveImage.querySelector('a.responsive-image__video-link');
      if (videoLink) {
        // Only keep the play overlay span (visual cue)
        const overlay = videoLink.querySelector('span.responsive-image__play-overlay');
        if (overlay) {
          firstColContent.push(overlay.cloneNode(true));
        }
      }
    }
  }

  // Second column: rich text
  let secondColContent = [];
  const richText = columns[1].querySelector('.rich-text');
  if (richText) {
    secondColContent.push(richText.cloneNode(true));
  }

  // Table header must match exactly
  const headerRow = ['Columns (columns173)'];
  const contentRow = [firstColContent, secondColContent];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Actually replace the element in the DOM
  if (block) {
    element.replaceWith(block);
  }
}
