/* global WebImporter */
export default function parse(element, { document }) {
  // Find the banner and modal
  const banner = element.querySelector('.newsletter-sign-up');
  const modal = element.querySelector('.modal-window');

  // Banner: left copy and right button
  let leftCopy = '';
  let rightButton = null;
  if (banner) {
    const left = banner.querySelector('.col-left .newsletter-sign-up__copy');
    if (left) leftCopy = left.textContent.trim();
    const right = banner.querySelector('.col-right .newsletter-sign-up__cta--tracking.button');
    if (right) rightButton = right;
  }

  // Modal: header, copy, form
  let modalHeader = null;
  let modalCopy = null;
  let modalForm = null;
  if (modal) {
    const wrapper = modal.querySelector('.js-signup-content__wrapper');
    if (wrapper) {
      modalHeader = wrapper.querySelector('h2');
      modalCopy = wrapper.querySelector('p');
      modalForm = wrapper.querySelector('form');
    }
  }

  // Compose columns
  const headerRow = ['Columns (columns46)'];

  // Column 1: banner left copy
  let col1;
  if (leftCopy) {
    col1 = document.createElement('p');
    col1.textContent = leftCopy;
  } else {
    col1 = document.createElement('span');
  }

  // Column 2: banner right button
  let col2 = rightButton ? rightButton : document.createElement('span');

  // Column 3: modal header, copy, form
  const col3 = document.createElement('div');
  if (modalHeader) col3.appendChild(modalHeader);
  if (modalCopy) col3.appendChild(modalCopy);
  if (modalForm) col3.appendChild(modalForm);

  const row = [col1, col2, col3];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  element.replaceWith(table);
}
