/* global WebImporter */
export default function parse(element, { document }) {
  // Find the stats block containing the three columns
  const statsBlock = element.querySelector('.block-wrapper.l-flex-three-block');
  let columns = [];

  if (statsBlock) {
    // Get the three statistic columns in order
    const statEls = Array.from(statsBlock.children).filter(child => child.classList.contains('stats__statistic'));
    columns = statEls.map(statEl => {
      // Use the .stats__content-wrapper for content (includes h3 and title)
      const contentWrapper = statEl.querySelector('.stats__content-wrapper');
      // Defensive: fallback to the statEl if not found
      return contentWrapper || statEl;
    });
  }

  // If no columns found, fallback to the element's inner content as a single column
  if (!columns.length) {
    columns = [element];
  }

  // Table: First row is header, second row is columns
  const headerRow = ['Columns (columns137)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
