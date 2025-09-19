/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Helper to extract meaningful content from a column
  function extractColumnContent(col) {
    // Remove all spacers and empty containers
    const children = Array.from(col.children).filter(child => {
      if (child.classList && child.classList.contains('spacer')) return false;
      if (child.children.length === 0 && child.textContent.trim() === '' && !child.querySelector('img')) return false;
      return true;
    });
    // If there's an image, use only the <img>
    const img = col.querySelector('.image.section img');
    if (img) {
      return [img];
    }
    // If there's rich text, use only the .rich-text
    const richText = col.querySelector('.rich-text');
    if (richText) {
      return [richText];
    }
    // Otherwise, use all non-empty children
    return children.length ? children : [];
  }

  // Only include columns that have actual content
  const contentRow = columns.map(extractColumnContent).filter(col => col.length > 0);
  if (contentRow.length === 0) return;

  const headerRow = ['Columns (columns115)'];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
