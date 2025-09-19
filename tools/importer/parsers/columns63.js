/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns (left and right)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // Always use the target block name as header
  const headerRow = ['Columns (columns63)'];

  // For each column, collect only meaningful content as a single cell
  const contentRow = columns
    .map((col) => {
      // Filter out empty divs and <hr> elements not followed by Section Metadata
      const filteredChildren = Array.from(col.children).filter((child) => {
        // Remove <hr> unless followed by Section Metadata
        if (child.tagName === 'HR') {
          let next = child.nextElementSibling;
          while (next && next.tagName === 'DIV' && next.innerHTML.trim() === '') {
            next = next.nextElementSibling;
          }
          if (next && next.tagName === 'TABLE') {
            const firstCell = next.querySelector('td,th');
            if (firstCell && firstCell.textContent.trim().toLowerCase().includes('section metadata')) {
              return true;
            }
          }
          return false;
        }
        // Remove empty divs (no content and no children)
        if (
          child.tagName === 'DIV' &&
          child.innerHTML.trim() === '' &&
          child.children.length === 0
        ) {
          return false;
        }
        // Remove divs that only contain whitespace or only empty divs
        if (
          child.tagName === 'DIV' &&
          child.children.length > 0 &&
          Array.from(child.children).every(
            (c) => c.tagName === 'DIV' && c.innerHTML.trim() === '' && c.children.length === 0
          )
        ) {
          return false;
        }
        // Remove divs that only contain a <hr> (not followed by Section Metadata)
        if (
          child.tagName === 'DIV' &&
          child.children.length === 1 &&
          child.firstElementChild.tagName === 'HR'
        ) {
          let next = child.firstElementChild.nextElementSibling;
          while (next && next.tagName === 'DIV' && next.innerHTML.trim() === '') {
            next = next.nextElementSibling;
          }
          if (next && next.tagName === 'TABLE') {
            const firstCell = next.querySelector('td,th');
            if (firstCell && firstCell.textContent.trim().toLowerCase().includes('section metadata')) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
      // If the column is now empty, skip it
      if (filteredChildren.length === 0) return null;
      // If all children are empty text nodes, skip
      if (filteredChildren.every(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '')) return null;
      if (filteredChildren.length === 1) {
        // Also skip if the only child is an empty div
        const only = filteredChildren[0];
        if (only.tagName === 'DIV' && only.innerHTML.trim() === '' && only.children.length === 0) return null;
        return only;
      } else {
        const frag = document.createDocumentFragment();
        filteredChildren.forEach((child) => frag.appendChild(child));
        return frag;
      }
    })
    .filter(Boolean); // Remove any nulls (empty columns)

  // Only build the table if there is at least one non-empty column
  if (contentRow.length === 0) return;
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}
