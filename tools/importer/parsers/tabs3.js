/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tab label from a jump-to link
  function extractTabLabel(a) {
    const span = a.querySelector('span');
    return span ? span.textContent.trim() : a.textContent.trim();
  }

  // Find the jump-to navigation and right column content
  const jumpTo = element.querySelector('.jump-to');
  const rightCol = element.querySelector('.l-two-block--offset-right-c1');
  if (!jumpTo || !rightCol) return;

  // Get all tab links
  const tabLinks = Array.from(jumpTo.querySelectorAll('.jump-to__list-item_tagging'));
  if (tabLinks.length === 0) return;

  // Extract all content blocks from the right column (excluding spacers)
  const contentBlocks = Array.from(rightCol.children).filter(
    (el) => !el.classList.contains('spacer')
  );

  // Split contentBlocks into groups for each tab
  // Use the number of tabLinks to divide contentBlocks as evenly as possible
  const tabRows = [];
  const blocksPerTab = Math.floor(contentBlocks.length / tabLinks.length);
  let remainder = contentBlocks.length % tabLinks.length;
  let startIdx = 0;
  for (let i = 0; i < tabLinks.length; i++) {
    const label = extractTabLabel(tabLinks[i]);
    let count = blocksPerTab + (remainder > 0 ? 1 : 0);
    remainder--;
    const tabContent = contentBlocks.slice(startIdx, startIdx + count);
    startIdx += count;
    if (tabContent.length > 0) {
      tabRows.push([label, tabContent]);
    }
  }

  // Build the table
  const headerRow = ['Tabs (tabs3)'];
  const rows = [headerRow, ...tabRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
