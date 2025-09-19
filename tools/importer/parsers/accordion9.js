/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate accordion items
  const accordionItems = Array.from(
    element.querySelectorAll('.accordion__item.section')
  );

  // Table header row
  const headerRow = ['Accordion (accordion9)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: Get the header text from the h3 > span (not the chevron icon)
    const header = item.querySelector('.accordion__header span:last-child');
    let titleCell = '';
    if (header) {
      titleCell = header.textContent.trim();
    }

    // Content cell: Get the content div
    const contentDiv = item.querySelector('.accordion__content');
    let contentCell = '';
    if (contentDiv) {
      // Defensive: Find the main content area inside accordion__content
      // Usually a div.accordionContent.parsys
      const accordionContent = contentDiv.querySelector('.accordionContent.parsys');
      if (accordionContent) {
        // The content is usually a two-column layout
        // We'll gather both columns and place them together in the cell
        // Find all immediate children that are .parsys_column
        const columns = Array.from(accordionContent.querySelectorAll(':scope > .parsys_column'));
        if (columns.length) {
          // For each column, gather its children (usually image or text)
          const colContent = columns.map((col) => {
            // Get all direct children that are sections (image/text)
            const sections = Array.from(col.children).filter(
              (child) => child.classList.contains('section')
            );
            return sections;
          });
          // Flatten and filter out empty arrays
          const flatContent = colContent.flat().filter(Boolean);
          // Place all content in the cell
          if (flatContent.length) {
            contentCell = flatContent;
          } else {
            // Fallback: use the accordionContent itself
            contentCell = accordionContent;
          }
        } else {
          // Fallback: use the accordionContent itself
          contentCell = accordionContent;
        }
      } else {
        // Fallback: use the contentDiv itself
        contentCell = contentDiv;
      }
    }
    // Push row: [title, content]
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
