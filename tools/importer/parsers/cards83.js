/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first image in a column
  function getImage(col) {
    const img = col.querySelector('img');
    return img || '';
  }

  // Helper to extract the main text content (title + description)
  function getText(col) {
    const rich = col.querySelector('.rich-text');
    if (!rich) return '';
    // Clone to avoid removing from original DOM
    const richClone = rich.cloneNode(true);
    // Remove empty <br> and &nbsp; at the end
    richClone.querySelectorAll('br').forEach((br) => {
      if (!br.nextSibling || br.nextSibling.textContent.trim() === '' || br.nextSibling.textContent.trim() === '\u00a0') {
        br.remove();
      }
    });
    richClone.innerHTML = richClone.innerHTML.replace(/(&nbsp;|\u00a0)+$/g, '');
    return richClone;
  }

  // Helper to extract the CTA link (if any)
  function getCTA(col) {
    const cta = col.querySelector('.callToAction a');
    if (!cta) return '';
    // Clone and strip classes
    const ctaClone = cta.cloneNode(true);
    ctaClone.removeAttribute('class');
    ctaClone.removeAttribute('aria-label');
    // Remove any nested <span> wrappers
    if (ctaClone.children.length === 1 && ctaClone.firstElementChild.tagName === 'SPAN') {
      ctaClone.innerHTML = ctaClone.firstElementChild.innerHTML;
    }
    return ctaClone;
  }

  // Find the card columns
  const columns = Array.from(element.querySelectorAll(':scope .parsys_column.l-three-block > .parsys_column'));

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards83)']);
  // Card rows
  columns.forEach((col) => {
    // Image cell
    const img = getImage(col);
    // Text cell (title + description + CTA)
    const textEls = [];
    const text = getText(col);
    if (text) textEls.push(text);
    const cta = getCTA(col);
    if (cta) {
      textEls.push(document.createElement('br'));
      textEls.push(cta);
    }
    rows.push([
      img,
      textEls.length > 0 ? textEls : '',
    ]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
