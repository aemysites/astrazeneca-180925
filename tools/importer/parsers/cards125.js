/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract image or linked image
  function extractImage(card) {
    const imgSection = card.querySelector('.image.section');
    if (!imgSection) return '';
    const responsive = imgSection.querySelector('.responsive-image');
    if (!responsive) return '';
    const link = responsive.querySelector('a');
    if (link && link.querySelector('img')) {
      // Reference the link element (not clone)
      return link;
    }
    const img = responsive.querySelector('img');
    if (img) return img;
    return '';
  }

  // Helper: extract text content (title, desc, CTA)
  function extractText(card) {
    const textSection = card.querySelector('.text.parbase.section .rich-text');
    const textNodes = [];
    if (textSection) {
      // Title (h3)
      const h3 = textSection.querySelector('h3');
      if (h3) textNodes.push(h3);
      // Description (p)
      const p = textSection.querySelector('p');
      if (p) textNodes.push(p);
    }
    // CTA
    const ctaSection = card.querySelector('.callToAction.section a');
    if (ctaSection) textNodes.push(ctaSection);
    return textNodes;
  }

  // Gather all cards
  const cards = Array.from(element.children);
  const rows = [];
  // Header row: block name exactly as required
  rows.push(['Cards (cards125)']);
  // Each card row
  cards.forEach(card => {
    const imgCell = extractImage(card);
    const textCell = extractText(card);
    rows.push([
      imgCell,
      textCell
    ]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
