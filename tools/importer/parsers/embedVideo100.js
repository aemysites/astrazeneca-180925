/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the video URL from iframe src
  function getVideoUrl(iframe) {
    if (!iframe) return '';
    let src = iframe.getAttribute('src') || '';
    // Ensure protocol
    if (src.startsWith('//')) {
      src = 'https:' + src;
    } else if (src.startsWith('/')) {
      src = window.location.origin + src;
    }
    // For YouTube, strip params for clean URL
    const ytMatch = src.match(/youtube\.com\/embed\/([\w-]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
    }
    // For Vimeo, etc, just use src without params
    return src.split('?')[0];
  }

  // Find the iframe (video embed)
  const iframe = element.querySelector('iframe');
  const videoUrl = getVideoUrl(iframe);

  // Try to find a poster image (YouTube overlays a play button, but sometimes there's an <img> as poster)
  let posterImg = null;
  const possibleImg = element.querySelector('.responsive-image img');
  if (possibleImg) {
    posterImg = possibleImg;
  }

  // Extract any visible text content from the element (for flexibility)
  let textContent = '';
  // Exclude script/style and hidden elements
  function extractText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent.trim();
      if (txt) textContent += (textContent ? ' ' : '') + txt;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const style = window.getComputedStyle ? window.getComputedStyle(node) : null;
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || (style && style.display === 'none')) return;
      for (const child of node.childNodes) extractText(child);
    }
  }
  extractText(element);

  // Build the cell content: poster image (if any), then the video URL as a link, then any text content
  const cellContent = [];
  if (posterImg) {
    cellContent.push(posterImg);
  }
  if (videoUrl) {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }
  if (textContent) {
    cellContent.push(document.createTextNode(textContent));
  }

  // Table rows
  const headerRow = ['Embed (embedVideo100)'];
  const contentRow = [cellContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
