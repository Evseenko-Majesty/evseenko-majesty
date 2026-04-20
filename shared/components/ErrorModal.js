// ============================================
// МОДАЛЬНОЕ ОКНО ОШИБКИ
// Всплывает по центру экрана
// ============================================

export function ErrorModal(title, message, buttonText, onButtonClick) {
  
  // Затемнение фона
  const overlay = document.createElement('div');
  overlay.className = 'error-modal-overlay';
  
  // Само окно
  const modal = document.createElement('div');
  modal.className = 'error-modal';
  
  // Заголовок
  const titleEl = document.createElement('h3');
  titleEl.className = 'error-modal__title';
  titleEl.textContent = title;
  
  // Сообщение
  const messageEl = document.createElement('p');
  messageEl.className = 'error-modal__message';
  messageEl.textContent = message;
  
  // Кнопка
  const button = document.createElement('button');
  button.className = 'error-modal__button';
  button.textContent = buttonText;
  button.addEventListener('click', () => {
    overlay.remove();
    if (onButtonClick) onButtonClick();
  });
  
  // Закрытие по клику на затемнение
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
  
  modal.appendChild(titleEl);
  modal.appendChild(messageEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
  
  return overlay;
}
