/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs (should be 3 for l-three-block)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns164)'];

  // For each column, gather all non-spacer, non-empty, non-hr content
  const contentRow = columns.map(col => {
    // Only include children that are not spacers, not empty, and not <hr>
    const colContentEls = Array.from(col.children)
      .filter(child => {
        if (child.classList.contains('spacer')) return false;
        // Remove <hr> elements
        if (child.tagName === 'HR') return false;
        // Remove divs that only contain <hr>
        if (
          child.children.length === 1 &&
          child.firstElementChild &&
          child.firstElementChild.tagName === 'HR'
        ) return false;
        // Remove empty text blocks (no meaningful text)
        if (
          child.classList.contains('text') &&
          !child.textContent.trim()
        ) return false;
        // Remove empty divs (no text, no children)
        if (child.tagName === 'DIV' && !child.textContent.trim() && child.children.length === 0) return false;
        return true;
      });
    // If no meaningful content, skip this column (do not return a cell)
    if (!colContentEls.length) return null;
    if (colContentEls.length === 1) return colContentEls[0];
    // If multiple, wrap in a fragment
    const frag = document.createDocumentFragment();
    colContentEls.forEach(el => frag.appendChild(el));
    return frag;
  }).filter(cell => cell); // Remove empty columns entirely

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
