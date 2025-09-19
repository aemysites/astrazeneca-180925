/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct child sections of a column
  function getDirectSections(col) {
    return Array.from(col.children);
  }

  // Get the two main columns
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  // Collect ALL sections for left column (not just heading and image)
  const leftColSections = getDirectSections(columns[0]);
  const leftCellContent = leftColSections.filter(
    (sec) => {
      // Exclude spacers and empty sections
      if (sec.classList.contains('spacer')) return false;
      if (sec.textContent.trim() === '' && !sec.querySelector('img')) return false;
      return true;
    }
  );

  // --- RIGHT COLUMN ---
  // Collect ALL sections for right column
  const rightColSections = getDirectSections(columns[1]);
  const rightCellContent = rightColSections.filter(
    (sec) => {
      // Exclude spacers and empty sections
      if (sec.classList.contains('spacer')) return false;
      if (sec.textContent.trim() === '' && !sec.querySelector('img')) return false;
      return true;
    }
  );

  // Table header row
  const headerRow = ['Columns (columns205)'];
  // Table content row
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
