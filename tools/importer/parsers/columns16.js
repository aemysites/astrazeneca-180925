/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate statistic blocks (columns)
  const statBlocks = Array.from(
    element.querySelectorAll(':scope .block-wrapper > .stats__statistic')
  );

  // Defensive: fallback if not found
  let columns = [];
  if (statBlocks.length) {
    columns = statBlocks.map((stat) => {
      // Use the content wrapper if present, else the stat itself
      const contentWrapper = stat.querySelector('.stats__content-wrapper');
      return contentWrapper || stat;
    });
  } else {
    // Try to find all stats__statistic anywhere inside
    const fallbackStats = Array.from(element.querySelectorAll('.stats__statistic'));
    if (!fallbackStats.length) return;
    columns = fallbackStats.map((stat) => {
      const contentWrapper = stat.querySelector('.stats__content-wrapper');
      return contentWrapper || stat;
    });
  }

  // If no columns found, do not proceed
  if (!columns.length) return;

  // Table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
