/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process expected structure
  if (!element.classList.contains('parsys_column') || !element.classList.contains('l-two-block')) return;

  // Header row as required
  const headerRow = ['Columns (columns86)'];

  // Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));

  // If no sub-columns, fallback to direct children
  const columnEls = columns.length ? columns : Array.from(element.children);

  // For each column, collect the main content (skip spacers)
  const contentRow = columnEls.map(col => {
    // Find the main block in the column
    const block = col.querySelector('.textActionFlexibleBlock.section');
    if (block) {
      // Return the block element itself (resilient to variations)
      return block;
    }
    // If no block, fallback to all children except spacers
    const children = Array.from(col.children).filter(child => !child.classList.contains('spacer'));
    if (children.length === 1) return children[0];
    if (children.length > 1) return children;
    // If nothing found, return empty string
    return '';
  });

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
