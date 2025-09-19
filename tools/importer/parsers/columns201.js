/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  function getImmediateChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Find the two columns in the source HTML
  // The structure is: l-constrained > wrapperPar > parsys_column (l-two-block--offset-right)
  // Inside that: two parsys_column children: -c0 (left), -c1 (right)
  const mainColumns = element.querySelectorAll(':scope > .wrapperPar > .parsys_column.l-two-block--offset-right > .parsys_column');

  // Defensive: fallback if not found
  let leftCol, rightCol;
  if (mainColumns.length === 2) {
    [leftCol, rightCol] = mainColumns;
  } else {
    // fallback: try to find by class suffix
    leftCol = element.querySelector('.parsys_column.l-two-block--offset-right-c0');
    rightCol = element.querySelector('.parsys_column.l-two-block--offset-right-c1');
  }

  // 2. Extract content for each column

  // LEFT COLUMN: image
  let leftContent = [];
  if (leftCol) {
    // Look for image section
    const imgSection = leftCol.querySelector('.image.section');
    if (imgSection) {
      const img = imgSection.querySelector('img');
      if (img) leftContent.push(img);
    }
  }

  // RIGHT COLUMN: text (with optional hr)
  let rightContent = [];
  if (rightCol) {
    // Ignore spacer (hr)
    // Get the text section
    const textSection = rightCol.querySelector('.text.parbase.section');
    if (textSection) {
      // Get the .rich-text div (contains h2 and p)
      const richText = textSection.querySelector('.rich-text');
      if (richText) {
        // Push h2 and p as separate elements if present
        const h2 = richText.querySelector('h2');
        const p = richText.querySelector('p');
        if (h2) rightContent.push(h2);
        if (p) rightContent.push(p);
      }
    }
  }

  // 3. Build the table rows
  const headerRow = ['Columns (columns201)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 4. Replace original element
  element.replaceWith(table);
}
