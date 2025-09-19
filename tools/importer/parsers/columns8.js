/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the main feature story column
  function getFeatureStoryCol(article) {
    if (!article) return '';
    const col = document.createElement('div');
    // Title
    const h2 = article.querySelector('h2');
    if (h2) col.appendChild(h2);
    // Main image link (with image inside)
    const mainImgLink = article.querySelector('a[href] > .homepage-hero__feature-img')?.parentElement;
    if (mainImgLink) col.appendChild(mainImgLink);
    // Below-image link (in <p>)
    const belowImgLink = article.querySelector('p > a');
    if (belowImgLink && belowImgLink.closest('p')) col.appendChild(belowImgLink.closest('p'));
    // Extra link (span > a)
    const extraLink = article.querySelector('span > a');
    if (extraLink && extraLink.closest('span')) col.appendChild(extraLink.closest('span'));
    return col;
  }

  // Helper to extract the trending stories column
  function getTrendingStoriesCol(trendingDiv) {
    if (!trendingDiv) return '';
    const col = document.createElement('div');
    const storyList = trendingDiv.querySelector('.homepage-hero__story-list');
    if (storyList) {
      const stories = storyList.querySelectorAll('.homepage-hero__trending-story');
      stories.forEach((story) => {
        const storyDiv = document.createElement('div');
        // Image link (with image inside)
        const imgLink = story.querySelector('a[href] > .homepage-hero__trending-img')?.parentElement;
        if (imgLink) storyDiv.appendChild(imgLink);
        // Content (title link and below-link)
        const content = story.querySelector('.treding-story-content');
        if (content) storyDiv.appendChild(content);
        col.appendChild(storyDiv);
      });
    }
    return col;
  }

  // Find the main article and trending stories
  const featureArticle = element.querySelector('.homepage-hero__feature-story');
  const trendingDiv = element.querySelector('.homepage-hero__trending-stories');

  // Compose the columns
  const col1 = getFeatureStoryCol(featureArticle);
  const col2 = getTrendingStoriesCol(trendingDiv);

  // Build the table rows
  const headerRow = ['Columns (columns8)'];
  const contentRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
