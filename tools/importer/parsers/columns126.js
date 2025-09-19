/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect the feature story column
  function getFeatureStoryCol() {
    const featureStory = element.querySelector('.homepage-hero__feature-story');
    if (!featureStory) return '';
    const col = document.createElement('div');
    // Title
    const title = featureStory.querySelector('.homepage-hero__story-title');
    if (title) col.appendChild(title);
    // Image link (with image inside)
    const imgLink = featureStory.querySelector('a');
    if (imgLink) col.appendChild(imgLink);
    // Text link below image
    const textLinkP = featureStory.querySelector('p');
    if (textLinkP) col.appendChild(textLinkP);
    return col;
  }

  // Helper to collect the trending stories column
  function getTrendingStoriesCol() {
    const trendingStories = element.querySelector('.homepage-hero__trending-stories');
    if (!trendingStories) return '';
    const col = document.createElement('div');
    // Title
    const title = trendingStories.querySelector('h2');
    if (title) col.appendChild(title);
    // List of stories
    const storyList = trendingStories.querySelector('.homepage-hero__story-list');
    if (storyList) {
      const articles = storyList.querySelectorAll('.homepage-hero__trending-story');
      articles.forEach(article => {
        const storyDiv = document.createElement('div');
        // Image link (with image inside)
        const imgLink = article.querySelector('a');
        if (imgLink) storyDiv.appendChild(imgLink);
        // Text
        const textDiv = article.querySelector('.treding-story-content');
        if (textDiv) storyDiv.appendChild(textDiv);
        col.appendChild(storyDiv);
      });
    }
    return col;
  }

  // Build the table
  const headerRow = ['Columns (columns126)'];
  const featureCol = getFeatureStoryCol();
  const trendingCol = getTrendingStoriesCol();
  const tableRows = [headerRow, [featureCol, trendingCol]];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
