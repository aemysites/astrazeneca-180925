/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns93)'];

  // Only include columns with actual content
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = [];

  columns.forEach((col) => {
    // If this column contains a text block
    const textSection = col.querySelector('.text.parbase.section');
    if (textSection) {
      contentRow.push(textSection);
      return;
    }
    // If this column contains a link image panel
    const linkImagePanel = col.querySelector('.linkImagePanelV2.section');
    if (linkImagePanel) {
      contentRow.push(linkImagePanel);
      return;
    }
    // Do NOT push empty columns
  });

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
