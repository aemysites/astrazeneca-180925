/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate column children
  const columns = element.querySelectorAll(':scope > div');
  if (!columns || columns.length === 0) return;

  // Prepare header row
  const headerRow = ['Columns (columns186)'];

  // We'll build the second row with only columns that have actual content
  const row = [];

  // First column: image (with play overlay)
  const col0 = columns[0];
  let col0Content = [];
  if (col0) {
    const imageSection = col0.querySelector('.image.section');
    if (imageSection) {
      const img = imageSection.querySelector('img');
      if (img) col0Content.push(img.cloneNode(true));
      const videoLink = imageSection.querySelector('a.responsive-image__video-link');
      if (videoLink) col0Content.push(videoLink.cloneNode(true));
    }
  }
  if (col0Content.length > 0) row.push(col0Content);

  // Second column: text, CTA
  const col1 = columns[1];
  let col1Content = [];
  if (col1) {
    const textSection = col1.querySelector('.text.parbase.section');
    if (textSection) {
      const richText = textSection.querySelector('.rich-text');
      if (richText) {
        const div = document.createElement('div');
        div.innerHTML = richText.innerHTML;
        col1Content.push(div);
      }
    }
    const ctaSection = col1.querySelector('.callToAction.section');
    if (ctaSection) {
      const ctaLink = ctaSection.querySelector('a.button');
      if (ctaLink) col1Content.push(ctaLink.cloneNode(true));
    }
  }
  if (col1Content.length > 0) row.push(col1Content);

  // Only create the table if at least one column has content
  if (row.length === 0) return;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
