/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > .parsys_column'));
  if (columns.length < 2) return; // Defensive: must be multi-column

  // 2. Compose header row as per block spec
  const headerRow = ['Columns (columns113)'];

  // 3. Compose content row: each cell is the content of a column
  const contentRow = columns.map((col) => {
    // Only direct children, skip spacers
    const sections = Array.from(col.children).filter(child => !child.classList.contains('spacer'));
    if (sections.length === 0) return '';
    if (sections.length === 1) return sections[0];
    // If multiple, wrap in a fragment to preserve order/semantics
    const frag = document.createDocumentFragment();
    sections.forEach(sec => frag.appendChild(sec));
    return frag;
  });

  // 4. Build the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}
