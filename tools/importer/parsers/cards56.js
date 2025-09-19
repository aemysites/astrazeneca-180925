/* global WebImporter */
export default function parse(element, { document }) {
  function extractImage(div) {
    const img = div && div.querySelector ? div.querySelector('img') : null;
    if (img) return img;
    let url = div && div.getAttribute ? div.getAttribute('data-hlx-background-image') : null;
    if (!url && div && div.style && div.style.backgroundImage) {
      url = div.style.backgroundImage;
    }
    if (url) {
      const match = url.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        const image = document.createElement('img');
        image.src = match[1];
        return image;
      }
    }
    return null;
  }

  const rows = [];
  const headerRow = ['Cards (cards56)'];
  rows.push(headerRow);

  let cardAdded = false;

  // Feature card
  const featureStory = element.querySelector('.homepage-hero__feature-story');
  if (featureStory) {
    const imgDiv = featureStory.querySelector('.homepage-hero__feature-img');
    const image = imgDiv ? extractImage(imgDiv) : null;
    if (image) {
      cardAdded = true;
      const textCell = document.createElement('div');
      // Title
      const title = featureStory.querySelector('.homepage-hero__story-title');
      if (title) {
        const h = document.createElement('h3');
        h.textContent = title.textContent.trim();
        textCell.appendChild(h);
      }
      // Description (get full text from p, not just link)
      const descP = featureStory.querySelector('p.media-text-link__header');
      if (descP) {
        const p = document.createElement('p');
        Array.from(descP.childNodes).forEach((node) => {
          p.appendChild(node.cloneNode(true));
        });
        textCell.appendChild(p);
      }
      // CTA
      const cta = featureStory.querySelector('.feature-stories__cta a');
      if (cta) {
        const ctaDiv = document.createElement('div');
        ctaDiv.appendChild(cta.cloneNode(true));
        textCell.appendChild(ctaDiv);
      }
      rows.push([image, textCell]);
    }
  }

  // Trending cards
  const trendingStories = element.querySelectorAll('.homepage-hero__trending-story');
  trendingStories.forEach((story) => {
    const imgDiv = story.querySelector('.homepage-hero__trending-img');
    const image = imgDiv ? extractImage(imgDiv) : null;
    if (image) {
      cardAdded = true;
      const textCell = document.createElement('div');
      // Title/Description (get full text from p, not just the link)
      const descP = story.querySelector('p.media-text-link__header');
      if (descP) {
        const h = document.createElement('h3');
        Array.from(descP.childNodes).forEach((node) => {
          h.appendChild(node.cloneNode(true));
        });
        textCell.appendChild(h);
      }
      // Category (span > a)
      const category = story.querySelector('span');
      if (category) {
        const catDiv = document.createElement('div');
        Array.from(category.childNodes).forEach((node) => {
          catDiv.appendChild(node.cloneNode(true));
        });
        textCell.appendChild(catDiv);
      }
      rows.push([image, textCell]);
    }
  });

  // Only replace if there is at least one card row (besides header)
  if (cardAdded) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
