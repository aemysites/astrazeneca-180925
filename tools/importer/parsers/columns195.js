/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Left column: heading/intro (cell 1), stats (cell 2)
  let leftTextCell = null;
  let statsCell = null;
  if (leftCol) {
    // Heading and intro
    const frag = document.createDocumentFragment();
    const textSection = leftCol.querySelector('.text .rich-text');
    if (textSection) {
      Array.from(textSection.children).forEach((el) => {
        frag.appendChild(el.cloneNode(true));
      });
    }
    if (frag.childNodes.length) {
      leftTextCell = frag;
    }
    // Stats block: all stats in one cell (side-by-side)
    const statsSection = leftCol.querySelector('.stats');
    if (statsSection) {
      const statsFrag = document.createDocumentFragment();
      const stats = statsSection.querySelectorAll('.stats__statistic');
      stats.forEach((stat) => {
        const statDiv = document.createElement('div');
        const qty = stat.querySelector('.stats__quantity');
        if (qty) {
          const strong = document.createElement('strong');
          strong.textContent = qty.textContent;
          statDiv.appendChild(strong);
        }
        const title = stat.querySelector('.stats__title');
        if (title) {
          const span = document.createElement('span');
          span.textContent = ' ' + title.textContent;
          statDiv.appendChild(span);
        }
        statsFrag.appendChild(statDiv);
      });
      if (statsFrag.childNodes.length) {
        statsCell = statsFrag;
      }
    }
  }

  // Right column: jump to section
  let rightCell = null;
  if (rightCol) {
    const frag = document.createDocumentFragment();
    const jumpTo = rightCol.querySelector('.jumpTo .jump-to');
    if (jumpTo) {
      // Heading
      const title = jumpTo.querySelector('.jump-to__title');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent;
        frag.appendChild(h3);
      }
      // List
      const ul = jumpTo.querySelector('.jump-to__list');
      if (ul) {
        const newUl = document.createElement('ul');
        Array.from(ul.querySelectorAll('li')).forEach((li) => {
          const newLi = document.createElement('li');
          const a = li.querySelector('a');
          if (a) {
            const anchor = document.createElement('a');
            anchor.href = a.getAttribute('href');
            anchor.textContent = a.textContent;
            newLi.appendChild(anchor);
          } else {
            newLi.textContent = li.textContent;
          }
          newUl.appendChild(newLi);
        });
        frag.appendChild(newUl);
      }
    }
    if (frag.childNodes.length) {
      rightCell = frag;
    }
  }

  // Compose table: header, then one row with three columns (text, stats, jump-to)
  const headerRow = ['Columns (columns195)'];
  const cells = [];
  if (leftTextCell) cells.push(leftTextCell);
  if (statsCell) cells.push(statsCell);
  if (rightCell) cells.push(rightCell);

  if (cells.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      cells,
    ], document);
    element.replaceWith(table);
  }
}
