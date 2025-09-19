/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card blocks
  const gridBlocks = element.querySelectorAll('.latest-news__grid-block');
  const headerRow = ['Cards (cardsNoImages33)'];
  const rows = [headerRow];

  gridBlocks.forEach((block) => {
    const link = block.querySelector('a.content-tile');
    if (!link) return;
    const contentWrapper = link.querySelector('.content-tile__content-wrapper');
    if (!contentWrapper) return;

    // Extract date, title, tags
    const dateElem = contentWrapper.querySelector('.content-tile__date');
    const titleElem = contentWrapper.querySelector('.content-tile__title');
    const tagsList = contentWrapper.querySelector('.content-tile__tags');

    // Compose card content
    const cardContent = document.createElement('div');
    // Date (optional, as a small element)
    if (dateElem && dateElem.textContent.trim()) {
      const dateDiv = document.createElement('div');
      dateDiv.textContent = dateElem.textContent;
      dateDiv.style.fontSize = '0.9em';
      cardContent.appendChild(dateDiv);
    }
    // Title (as heading)
    if (titleElem && titleElem.textContent.trim()) {
      const heading = document.createElement('strong');
      heading.textContent = titleElem.textContent;
      cardContent.appendChild(heading);
    }
    // Tags (optional, as small text)
    if (tagsList) {
      const tags = Array.from(tagsList.querySelectorAll('li')).map(li => li.textContent.trim()).filter(Boolean).join(', ');
      if (tags) {
        const tagsElem = document.createElement('div');
        tagsElem.textContent = tags;
        tagsElem.style.fontSize = '0.9em';
        tagsElem.style.color = '#666';
        cardContent.appendChild(tagsElem);
      }
    }
    // Add CTA (link to article) at the bottom
    if (link.href) {
      const ctaDiv = document.createElement('div');
      const ctaLink = document.createElement('a');
      ctaLink.href = link.href;
      ctaLink.textContent = 'Read more';
      ctaDiv.appendChild(ctaLink);
      cardContent.appendChild(ctaDiv);
    }
    rows.push([cardContent]);
  });

  // Add CTA button as last card row if present
  const buttonWrapper = element.querySelector('.latest-news__button-wrapper');
  if (buttonWrapper) {
    const buttonLink = buttonWrapper.querySelector('a');
    if (buttonLink) {
      rows.push([buttonLink]); // Reference existing element
    }
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
