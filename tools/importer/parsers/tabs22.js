/* global WebImporter */
export default function parse(element, { document }) {
  // Only proceed if element contains the tab nav structure
  if (!element || !element.querySelectorAll) return;

  // Block header row as required
  const headerRow = ['Tabs (tabs22)'];

  // Find all tab labels from the nav structure
  const tabNav = element.querySelector('.js-generic-tabs__list');
  if (!tabNav) return;
  const tabItems = Array.from(tabNav.querySelectorAll('.js-generic-tabs__item:not(.generic-tabs__item--more)'));

  // Compose the table rows: label and content (content always empty for this HTML)
  const tabRows = tabItems.map((li) => {
    const link = li.querySelector('a');
    if (!link) return null;
    const tabLabel = link.textContent.trim();
    // Only include the label and omit the second column if content is missing
    return [tabLabel];
  }).filter(Boolean);

  // Compose the table rows
  const rows = [headerRow, ...tabRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
