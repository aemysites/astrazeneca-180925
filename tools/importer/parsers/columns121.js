/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns (columns121)'];

  // Get immediate column children (should be 2 for two-column layout)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only include columns that have meaningful content (not just empty wrappers)
  const meaningfulColumns = columns.map((col) => {
    // If the column contains a .rich-text with non-empty text, use it
    const richText = col.querySelector('.rich-text');
    if (richText && richText.textContent.trim()) {
      return richText;
    }
    // If the column contains an image section, use the image or video link
    const imageSection = col.querySelector('.image.section');
    if (imageSection) {
      const img = imageSection.querySelector('img');
      const videoLink = imageSection.querySelector('a.responsive-image__video-link');
      // Only return non-empty arrays
      if (img && videoLink) {
        return [img, videoLink].filter(Boolean);
      }
      if (img) return img;
      if (videoLink) return videoLink;
    }
    // If nothing meaningful, skip this column
    return null;
  }).filter(cell => {
    // Only keep non-null and non-empty cells
    if (!cell) return false;
    if (Array.isArray(cell)) return cell.length > 0 && cell.some(item => {
      if (!item) return false;
      if (item.textContent) return item.textContent.trim().length > 0;
      return true;
    });
    if (cell.textContent) return cell.textContent.trim().length > 0;
    return true;
  });

  // Defensive: if no meaningful columns, fallback to original element
  if (meaningfulColumns.length === 0) {
    const cells = [
      headerRow,
      [element]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Compose the table
  const cells = [
    headerRow,
    meaningfulColumns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
