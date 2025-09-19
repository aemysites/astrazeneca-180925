/* global WebImporter */
export default function parse(element, { document }) {
  // Get all phase panels and their headings
  const phasePanels = Array.from(element.querySelectorAll('.dual-tabs__panel'));
  const phaseHeadings = Array.from(element.querySelectorAll('.dual-tabs__heading'));

  // Defensive: Only proceed if we have panels
  if (!phasePanels.length) return;

  // Map each panel to its heading (by order)
  const columns = phasePanels.map((panel, idx) => {
    // Find the heading for this panel
    let heading = phaseHeadings[idx];
    // Defensive: fallback to panel's h3 if heading not found
    if (!heading) {
      heading = panel.querySelector('h3');
    }
    // Compose a column div
    const colDiv = document.createElement('div');
    // Add heading
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      colDiv.appendChild(h);
    }
    // Add all compounds (as cards)
    const compoundsList = panel.querySelector('ul.pipeline__compounds');
    if (compoundsList) {
      Array.from(compoundsList.children).forEach((li) => {
        const compoundDiv = li.querySelector('.js-pipeline__compound');
        if (compoundDiv) {
          const card = document.createElement('div');
          card.className = 'pipeline-compound-card';
          const trigger = compoundDiv.querySelector('a.pipeline__compound-trigger');
          if (trigger) {
            const nameEl = trigger.querySelector('.pipeline__compound-name');
            if (nameEl) {
              const strong = document.createElement('strong');
              strong.textContent = nameEl.textContent.trim();
              card.appendChild(strong);
            }
            const descEl = trigger.querySelector('.pipeline__compound-description');
            if (descEl) {
              const em = document.createElement('em');
              em.textContent = descEl.textContent.trim();
              card.appendChild(document.createElement('br'));
              card.appendChild(em);
            }
          }
          const popup = compoundDiv.querySelector('.pipeline__compound-popup');
          if (popup) {
            const detailsList = popup.querySelector('ul.pipeline__compound-details');
            if (detailsList) {
              const ul = document.createElement('ul');
              Array.from(detailsList.children).forEach((detailLi) => {
                const li = document.createElement('li');
                li.innerHTML = detailLi.innerHTML;
                ul.appendChild(li);
              });
              card.appendChild(ul);
            }
          }
          colDiv.appendChild(card);
        }
      });
    }
    return colDiv;
  });

  // Compose the table rows
  const headerRow = ['Columns (columns32)'];
  const columnsRow = columns;
  const rows = [headerRow, columnsRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
