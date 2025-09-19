/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns
  const columns = Array.from(element.querySelectorAll(':scope > .l-padded > .l-constrained > .wrapperPar > .parsys_column.l-two-block--offset-left > .parsys_column'));

  let col0 = columns[0];
  let col1 = columns[1];
  // Fallback if not found
  if (!col0 || !col1) {
    const allCols = Array.from(element.querySelectorAll('.parsys_column.l-two-block--offset-left-c0, .parsys_column.l-two-block--offset-left-c1'));
    col0 = allCols[0];
    col1 = allCols[1];
  }

  // Column 0: Quote + CTA
  const col0Content = [];
  if (col0) {
    const quoteSection = col0.querySelector('.quote.section');
    if (quoteSection) col0Content.push(quoteSection);
    const cta = col0.querySelector('.callToAction.section');
    if (cta) col0Content.push(cta);
  }

  // Column 1: Image
  const col1Content = [];
  if (col1) {
    const imgSection = col1.querySelector('.image.section');
    if (imgSection) {
      const img = imgSection.querySelector('img');
      if (img) col1Content.push(img);
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns85)'];
  const contentRow = [col0Content, col1Content];

  // Create table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace element
  element.replaceWith(table);
}
