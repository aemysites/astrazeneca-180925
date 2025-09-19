/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a card element from a compound
  function createCard(compoundDiv) {
    // Get the trigger link (contains name and description)
    const trigger = compoundDiv.querySelector('.pipeline__compound-trigger');
    let title = '';
    let description = '';
    if (trigger) {
      const strong = trigger.querySelector('.pipeline__compound-name');
      if (strong) title = strong.textContent.trim();
      const em = trigger.querySelector('.pipeline__compound-description');
      if (em) description = em.textContent.trim();
    }
    // Get details from popup
    const popup = compoundDiv.querySelector('.pipeline__compound-popup');
    let details = [];
    if (popup) {
      const detailsList = popup.querySelector('.pipeline__compound-details');
      if (detailsList) {
        details = Array.from(detailsList.querySelectorAll('.pipeline__compound-detail')).map(li => li.textContent.trim());
      }
    }
    // Build card content
    const card = document.createElement('div');
    card.style.display = 'block';
    // Heading
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      card.appendChild(heading);
    }
    // Description
    if (description) {
      const desc = document.createElement('div');
      desc.textContent = description;
      card.appendChild(desc);
    }
    // Details (as extra lines)
    if (details.length) {
      details.forEach((detail) => {
        const detailDiv = document.createElement('div');
        detailDiv.textContent = detail;
        card.appendChild(detailDiv);
      });
    }
    return card;
  }

  // Get all compounds
  const compounds = Array.from(element.querySelectorAll(':scope > li .pipeline__compound'));
  // Table header
  const headerRow = ['Cards (cardsNoImages43)'];
  // Build rows
  const rows = compounds.map(compoundDiv => [createCard(compoundDiv)]);
  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace element
  element.replaceWith(table);
}
