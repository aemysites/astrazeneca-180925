/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must use the block name as specified
  const headerRow = ['Search (search166)'];

  // Table body row: always use the query index URL as specified in the block description
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const bodyRow = [queryIndexUrl];

  // Construct the table as required: 1 column, 2 rows
  const cells = [headerRow, bodyRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
