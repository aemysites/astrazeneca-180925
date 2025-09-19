/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages5) block
  const headerRow = ['Cards (cardsNoImages5)'];
  const rows = [headerRow];

  // Defensive: get all immediate child columns
  const columns = element.querySelectorAll(':scope > div');

  columns.forEach((col) => {
    // Each column contains a callToAction section
    const ctaSection = col.querySelector('.callToAction.section');
    if (ctaSection) {
      // Find the link inside the CTA
      const link = ctaSection.querySelector('a');
      if (link) {
        // We'll use the link as the only content in the card
        // If there's a span inside, use it for the text
        const span = link.querySelector('span');
        let cardContent;
        if (span) {
          // Create a new link element with just the span text
          // But we want to preserve the original link element for resilience
          cardContent = link;
        } else {
          // Fallback: use the link itself
          cardContent = link;
        }
        rows.push([cardContent]);
      }
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
