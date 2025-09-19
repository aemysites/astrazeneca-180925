/* global WebImporter */
export default function parse(element, { document }) {
  // Find the filter wrapper containing the accordion content
  const filterWrapper = element.querySelector('.az-filter-items__filter-wrapper');
  if (!filterWrapper) return;

  // Find the filters region (the accordion panel container)
  const filtersRegion = filterWrapper.querySelector('.az-filter-items__filters-region');
  if (!filtersRegion) return;

  // Find the inner region
  const filtersRegionInner = filtersRegion.querySelector('.az-filter-items__filters-region-inner');
  if (!filtersRegionInner) return;

  // Find the filters lists block
  const filtersLists = filtersRegionInner.querySelector('.az-filter-items__filters-lists');
  if (!filtersLists) return;

  // Find the filters block (contains title and list)
  const filtersBlock = filtersLists.querySelector('.az-filter-items__filters-block');
  if (!filtersBlock) return;

  // The list of category items
  const listElem = filtersBlock.querySelector('.az-filter-items__filters-list');
  if (!listElem) return;

  // Build header row
  const headerRow = ['Accordion (accordion7)'];

  // Build accordion rows
  const rows = [];

  // Each filter item is a <li> with a button and span
  const items = Array.from(listElem.querySelectorAll('.az-filter-items__filters-list-item'));
  items.forEach((li) => {
    // Title cell: get the button text (category name)
    const button = li.querySelector('button');
    let titleCell = '';
    if (button) {
      const span = button.querySelector('span');
      titleCell = span ? span.textContent.trim() : button.textContent.trim();
    } else {
      titleCell = li.textContent.trim();
    }
    // Content cell: leave empty string if no extra content in HTML (no duplicate, no &nbsp;)
    rows.push([titleCell, '']);
  });

  // Compose cells for the block table
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
