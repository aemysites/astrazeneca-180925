/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by class
  function getColumnDivs(parent) {
    // Find all direct children with class starting with 'parsys_column l-two-block--padded-c'
    return Array.from(parent.children).filter(
      (child) => child.classList && Array.from(child.classList).some((cls) => cls.startsWith('l-two-block--padded-c'))
    );
  }

  // Find the two column divs
  const parsysColumn = element.querySelector('.parsys_column.l-two-block--padded');
  if (!parsysColumn) return;
  const columnDivs = getColumnDivs(parsysColumn);
  if (columnDivs.length < 2) return;

  // --- COLUMN 1: Quote, Author, CTA ---
  const col1 = columnDivs[0];
  // Find the quote block
  const quoteSection = col1.querySelector('.quote.section');
  // Find the CTA (button link)
  const ctaSection = col1.querySelector('.callToAction.section');
  // Compose left column content
  const leftColumnContent = [];
  if (quoteSection) leftColumnContent.push(quoteSection);
  if (ctaSection) leftColumnContent.push(ctaSection);

  // --- COLUMN 2: Image (with video link overlay) ---
  const col2 = columnDivs[1];
  // Find the image section
  const imageSection = col2.querySelector('.image.section');
  let rightColumnContent = [];
  if (imageSection) {
    // Use the whole image section, which includes the image and video link overlay
    rightColumnContent.push(imageSection);
  }

  // Table header
  const headerRow = ['Columns (columns96)'];
  // Table content row: two columns
  const contentRow = [leftColumnContent, rightColumnContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
