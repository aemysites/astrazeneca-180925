/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all direct column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  
  // Defensive: Only proceed if we have at least two columns
  if (columns.length < 2) return;

  // Prepare each column's content as a cell
  const cells = columns.map((col) => {
    // We'll collect all relevant children for each column
    const colContent = [];
    // Only direct children of the column
    const children = Array.from(col.children);
    children.forEach((child) => {
      // For text section, rich-text
      if (child.classList.contains('text')) {
        const richText = child.querySelector('.rich-text');
        if (richText) colContent.push(richText);
      }
      // For image section
      else if (child.classList.contains('image')) {
        // Use the responsive-image container
        const respImg = child.querySelector('.responsive-image');
        if (respImg) {
          // Always include the image element
          const img = respImg.querySelector('img');
          if (img) colContent.push(img);
          // If there's a video link (not an image), include as a link
          // Only add links for non-image src attributes (per requirements)
          // Find all <a> inside responsive-image
          const videoLinks = respImg.querySelectorAll('a[href]');
          videoLinks.forEach((a) => {
            // Defensive: Only add if href is not just '#?vid=...'
            if (a.getAttribute('href') && !a.querySelector('img')) {
              // Create a link to the video src if possible
              // If data-video-id exists, try to construct a YouTube or Kaltura link
              const player = a.getAttribute('data-video-player');
              const videoId = a.getAttribute('data-video-id');
              let href = a.getAttribute('href');
              // Try to resolve to a real video URL if possible
              if (player === 'YOUTUBE' && videoId) {
                href = `https://www.youtube.com/watch?v=${videoId.replace(/^az/, '')}`;
              } else if (player === 'KALTURA' && videoId) {
                href = `https://www.kaltura.com/entry/${videoId.replace(/^az/, '')}`;
              }
              // Create a link element
              const link = document.createElement('a');
              link.href = href;
              link.textContent = 'Watch video';
              link.target = '_blank';
              colContent.push(link);
            }
          });
        }
      }
      // For spacer, skip
      // Defensive: If other content types, add them
      else if (!child.classList.contains('spacer')) {
        colContent.push(child);
      }
    });
    // If nothing found, fallback to column itself
    if (colContent.length === 0) colContent.push(col);
    return colContent;
  });

  // Table rows: header, then content row
  const headerRow = ['Columns (columns178)'];
  const contentRow = cells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
