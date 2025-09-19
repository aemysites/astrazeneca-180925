/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Table (no header, tableNoHeader101)'];

  // Find all four-block rows
  const fourBlockRows = Array.from(
    element.querySelectorAll('.wrapperPar > .parsys_column.l-four-block')
  );

  // For each four-block row, collect its 4 columns
  const tableRows = fourBlockRows.map((row) => {
    // Each row has 4 columns: l-four-block-c0 ... c3
    const cols = [
      row.querySelector('.l-four-block-c0'),
      row.querySelector('.l-four-block-c1'),
      row.querySelector('.l-four-block-c2'),
      row.querySelector('.l-four-block-c3'),
    ];
    // For each column, grab the heading and paragraph
    return cols.map((col) => {
      if (!col) return '';
      const richText = col.querySelector('.rich-text');
      if (!richText) return '';
      // Get heading (usually h3)
      const heading = richText.querySelector('h3');
      // Get paragraph
      const para = richText.querySelector('p');
      // Compose cell content: preserve formatting (b, i) in heading
      const frag = document.createDocumentFragment();
      if (heading) frag.appendChild(heading.cloneNode(true));
      if (para) frag.appendChild(para.cloneNode(true));
      // If both missing, return empty
      if (!frag.childNodes.length) return '';
      return frag;
    });
  });

  // Compose cells array
  const cells = [headerRow, ...tableRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
