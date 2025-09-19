/* global WebImporter */
export default function parse(element, { document }) {
  // Get all phase headings and their corresponding panels
  const phaseHeadings = Array.from(element.querySelectorAll('p.dual-tabs__heading'));
  const phasePanels = Array.from(element.querySelectorAll('div.dual-tabs__panel'));

  // Defensive: Only process if we have matching headings and panels
  if (!phaseHeadings.length || phaseHeadings.length !== phasePanels.length) {
    return;
  }

  // Helper for safe id selection (no CSS.escape)
  function getPanelPopup(panel, popupId) {
    // Remove whitespace from id attribute for matching
    const popups = Array.from(panel.querySelectorAll('div.pipeline__compound-popup'));
    return popups.find(p => (p.getAttribute('id')||'').trim() === popupId.trim());
  }

  // Each column is a phase (Phase I, Phase II, ...)
  const columns = phaseHeadings.map((heading, idx) => {
    const panel = phasePanels[idx];
    // Phase title (from heading)
    const phaseTitle = document.createElement('div');
    phaseTitle.textContent = heading.textContent.trim();
    phaseTitle.style.fontWeight = 'bold';
    phaseTitle.style.marginBottom = '1em';

    // Find all compounds in this phase
    const compoundsList = panel.querySelector('ul.pipeline__compounds');
    let compounds = [];
    if (compoundsList) {
      compounds = Array.from(compoundsList.querySelectorAll('li.pipeline__compound'));
    }

    // For each compound, build its display (name in bold, description below, and all details if present)
    const compoundBlocks = compounds.map((compoundLi) => {
      const trigger = compoundLi.querySelector('a.pipeline__compound-trigger');
      if (!trigger) return null;
      const strong = trigger.querySelector('strong.pipeline__compound-name');
      const em = trigger.querySelector('em.pipeline__compound-description');
      if (!strong) return null;

      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '1em';
      // Name in bold
      const name = document.createElement('div');
      name.textContent = strong.textContent.trim();
      name.style.fontWeight = 'bold';
      wrapper.appendChild(name);
      // Description (if present)
      if (em) {
        const desc = document.createElement('div');
        desc.textContent = em.textContent.trim();
        desc.style.fontSize = 'smaller';
        wrapper.appendChild(desc);
      }
      // Extract details from popup if present
      const popupId = trigger.getAttribute('aria-controls');
      if (popupId) {
        const popup = getPanelPopup(panel, popupId);
        if (popup) {
          const detailsList = popup.querySelector('ul.pipeline__compound-details');
          if (detailsList) {
            Array.from(detailsList.children).forEach((li) => {
              // If the detail contains a table, include the table as well
              const table = li.querySelector('table');
              if (table) {
                // Add the label if present
                const strongLabel = li.querySelector('strong');
                if (strongLabel) {
                  const labelDiv = document.createElement('div');
                  labelDiv.textContent = strongLabel.textContent.trim();
                  labelDiv.style.fontWeight = 'bold';
                  wrapper.appendChild(labelDiv);
                }
                // Clone and append the table
                wrapper.appendChild(table.cloneNode(true));
              } else {
                // Otherwise, add the text content (label + value)
                const detailDiv = document.createElement('div');
                detailDiv.textContent = li.textContent.trim();
                wrapper.appendChild(detailDiv);
              }
            });
          }
        }
      }
      return wrapper;
    }).filter(Boolean);

    // Compose the column cell: phase title + all compounds
    const cellDiv = document.createElement('div');
    cellDiv.appendChild(phaseTitle);
    compoundBlocks.forEach(el => cellDiv.appendChild(el));
    return cellDiv;
  });

  // Build the table rows
  const headerRow = ['Columns (columns6)'];
  const contentRow = columns;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
