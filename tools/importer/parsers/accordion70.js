/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  function getImmediateDivs(el) {
    return Array.from(el.querySelectorAll(':scope > div'));
  }

  // Find the left and right columns
  const columns = getImmediateDivs(element);
  if (columns.length < 2) return; // Defensive: needs two columns

  // LEFT COLUMN: Accordion content
  const leftCol = columns[0];
  // Find the accordion block
  const accordionSection = leftCol.querySelector('.accordion.section');
  if (!accordionSection) return;
  const accordionItems = accordionSection.querySelectorAll('.accordion__item.section');

  // RIGHT COLUMN: Downloads
  const rightCol = columns[1];
  // Find all download tiles
  const downloadTiles = rightCol.querySelectorAll('.download-tile__wrapper');

  // Build a map of download titles to their link element
  const downloadMap = {};
  downloadTiles.forEach((a) => {
    const header = a.querySelector('.download-tile__header');
    if (header) {
      // Normalize title text for matching
      const titleText = header.textContent.trim();
      downloadMap[titleText] = a;
    }
  });

  // Table header row (EXACTLY one column)
  const headerRow = ['Accordion (accordion70)'];
  const rows = [headerRow];

  // For each accordion item, build a row
  accordionItems.forEach((item) => {
    // Title cell: Use only the text label from the <h3> element
    const headerEl = item.querySelector('.accordion__header');
    let titleCell = '';
    if (headerEl) {
      const spanTitle = headerEl.querySelector('span:last-child');
      if (spanTitle) {
        titleCell = spanTitle.textContent.trim();
      } else {
        titleCell = headerEl.textContent.trim();
      }
    }

    // Content cell: The accordion__content
    const contentEl = item.querySelector('.accordion__content');
    let contentCellChildren = [];
    if (contentEl) {
      // Grab all children of the content div
      contentCellChildren = Array.from(contentEl.children);
    }

    // Try to find a matching download link for this accordion item
    // Match by title text inside the header
    let downloadLink = null;
    if (headerEl) {
      const spanTitle = headerEl.querySelector('span:last-child');
      if (spanTitle) {
        const matchTitle = spanTitle.textContent.trim();
        for (const key in downloadMap) {
          if (key.includes(matchTitle)) {
            downloadLink = downloadMap[key];
            break;
          }
        }
      }
    }
    // If found, add the download link to the content cell
    let contentCell = [];
    if (contentCellChildren.length > 0) {
      contentCell = [...contentCellChildren];
    }
    if (downloadLink) {
      contentCell.push(downloadLink);
    }
    if (contentCell.length === 0) {
      contentCell = [''];
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
