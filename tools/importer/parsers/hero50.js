/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the hero content
  const section = element.querySelector('section');
  let bgImg = null;
  let contentCell = '';

  if (section) {
    // Background image
    bgImg = section.querySelector('img');
    // Extract text content for the content row
    // Try to find any text nodes in the parent element except inside the <img>
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Ignore whitespace-only nodes
        if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
        // Ignore text inside <img>
        if (node.parentNode && node.parentNode.nodeName === 'IMG') return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let textParts = [];
    let node;
    while ((node = walker.nextNode())) {
      textParts.push(node.textContent.trim());
    }
    contentCell = textParts.join(' ');
  }

  // Always provide 3 rows: header, image, content (content row only if not empty)
  const headerRow = ['Hero (hero50)'];
  const imageRow = [bgImg ? bgImg : ''];
  const rows = [headerRow, imageRow];

  // Only add content row if there is actual content
  if (contentCell && contentCell.trim()) {
    rows.push([contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
