/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get full block content for a column
  function getFullContent(parent) {
    // Clone all children to preserve structure
    const fragment = document.createDocumentFragment();
    Array.from(parent.childNodes).forEach(node => {
      fragment.appendChild(node.cloneNode(true));
    });
    return fragment;
  }

  // Find the main hero and trending stories containers
  const heroSection = element.querySelector('.homepage-hero__feature-story');
  const trendingSection = element.querySelector('.homepage-hero__trending-stories');

  // --- Column 1: Hero Story ---
  let heroColumn = '';
  if (heroSection) {
    heroColumn = getFullContent(heroSection);
  }

  // --- Column 2: Trending Stories ---
  let trendingColumn = '';
  if (trendingSection) {
    trendingColumn = getFullContent(trendingSection);
  }

  // Table rows
  const headerRow = ['Columns (columns75)'];
  const columnsRow = [heroColumn, trendingColumn];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
