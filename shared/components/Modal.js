// ============================================
// МОДАЛЬНОЕ ОКНО — ОБЩЕЕ
// ============================================

export function Modal(title, message, buttonText, onButtonClick) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const titleEl = document.createElement('h3');
  titleEl.className = 'modal__title';
  titleEl.textContent = title;
  
  const messageEl = document.createElement('p');
  messageEl.className = 'modal__message';
  messageEl.textContent = message;
  
  const button = document.createElement('button');
  button.className = 'modal__button';
  button.textContent = buttonText;
  button.addEventListener('click', () => {
    overlay.remove();
    if (onButtonClick) onButtonClick();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
  
  modal.appendChild(titleEl);
  modal.appendChild(messageEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
  
  return overlay;
}
