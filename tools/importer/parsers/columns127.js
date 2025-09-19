/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Only include columns that have meaningful content (not empty or whitespace only, not empty divs)
  const meaningfulColumns = columns.filter(col => {
    // Check for images
    if (col.querySelector('img')) return true;
    // Check for non-empty text nodes (ignoring whitespace)
    const text = col.textContent || '';
    if (text.replace(/\s+/g, '').length > 0) {
      // Ignore columns that only contain empty divs (no text, no images)
      const children = Array.from(col.children);
      if (children.length === 0) return true;
      const allChildrenAreEmptyDivs = children.every(child => child.tagName === 'DIV' && child.textContent.replace(/\s+/g, '').length === 0 && !child.querySelector('img'));
      if (!allChildrenAreEmptyDivs) return true;
    }
    return false;
  });
  if (meaningfulColumns.length === 0) return;

  // For each meaningful column, extract the most relevant content
  const contentRow = meaningfulColumns.map(col => {
    // Prefer rich text or text section with actual content
    const textSection = col.querySelector('.rich-text, .text.parbase.section');
    if (textSection && textSection.textContent.replace(/\s+/g, '').length > 0) {
      return textSection;
    }
    // Prefer image if present
    const img = col.querySelector('img');
    if (img) return img;
    // Fallback: the column itself (only if it has content)
    if ((col.textContent || '').replace(/\s+/g, '').length > 0) return col;
    return null;
  }).filter(cell => {
    // Remove any empty cells (no text, no images)
    if (!cell) return false;
    if (cell.tagName === 'IMG') return true;
    if ((cell.textContent || '').replace(/\s+/g, '').length > 0) return true;
    return false;
  });

  if (contentRow.length === 0) return;

  // Build table rows
  const headerRow = ['Columns (columns127)'];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
