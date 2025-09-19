/* global WebImporter */
export default function parse(element, { document }) {
  // Find all splitFeatureTile elements (each column)
  const tiles = element.querySelectorAll('.splitFeatureTile');

  // Defensive: If no tiles, exit
  if (!tiles.length) return;

  // Each column cell is the <a> inside each tile (reference, not clone)
  const columnCells = Array.from(tiles).map(tile => {
    const link = tile.querySelector('a.wscd-split-feature-tile');
    return link || tile; // fallback to tile itself if no link
  });

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns35)'];
  const tableRows = [headerRow, columnCells];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with block
  element.replaceWith(block);
}
