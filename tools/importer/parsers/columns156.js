/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header row
  const headerRow = ['Columns (columns156)'];

  // Get the two column containers
  const columns = element.querySelectorAll(':scope > div');
  if (columns.length !== 2) {
    // Defensive: fallback to replacing with just the block name if structure is unexpected
    const fallback = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(fallback);
    return;
  }

  // Helper to extract all content from a column, flattening common wrappers
  function extractColumnContent(col) {
    // Prefer .image.section or .text.parbase.section or .rich-text, else use all content
    let mainSection = col.querySelector('.image.section, .text.parbase.section, .rich-text');
    let content = [];
    if (mainSection) {
      // Use ALL descendants, not just direct children, and keep text nodes
      content = Array.from(mainSection.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim() !== '';
        if (n.nodeType === Node.ELEMENT_NODE && n.innerHTML.trim() === '') return false;
        return true;
      });
      // If .rich-text, flatten to paragraphs and inline elements
      if (mainSection.classList.contains('rich-text')) {
        content = Array.from(mainSection.querySelectorAll('p, ul, ol, li, sup, strong, em, a, br')).filter(n => {
          if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim() !== '';
          if (n.nodeType === Node.ELEMENT_NODE && n.innerHTML.trim() === '') return false;
          return true;
        });
        // If nothing found, fallback to all children
        if (!content.length) {
          content = Array.from(mainSection.childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== '');
        }
      }
    }
    // If still empty, fallback to all element children of the column
    if (!content.length) {
      content = Array.from(col.children);
    }
    // If still empty, fallback to all non-empty text nodes
    if (!content.length) {
      content = Array.from(col.childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== '');
    }
    // If only one node, use that node directly
    return content.length === 1 ? content[0] : content;
  }

  const col0Content = extractColumnContent(columns[0]);
  const col1Content = extractColumnContent(columns[1]);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [col0Content, col1Content]
  ], document);

  element.replaceWith(table);
}
