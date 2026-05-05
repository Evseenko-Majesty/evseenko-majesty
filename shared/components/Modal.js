// ============================================
// МОДАЛЬНОЕ ОКНО — ОБЩИЙ КОМПОНЕНТ
// ============================================

export function Modal(title, message, buttonText, onButtonClick) {
  
  // Затемнение фона
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  // Само окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Заголовок
  const titleEl = document.createElement('h3');
  titleEl.className = 'modal__title';
  titleEl.textContent = title;
  
  // Сообщение
  const messageEl = document.createElement('p');
  messageEl.className = 'modal__message';
  messageEl.textContent = message;
  
  // Кнопка
  const button = document.createElement('button');
  button.className = 'btn modal__button';
  button.textContent = buttonText;
  
  // При клике: удаляем окно, потом выполняем действие
  button.addEventListener('click', () => {
    overlay.remove();
    if (onButtonClick) onButtonClick();
  });
  
  // Собираем
  modal.appendChild(titleEl);
  modal.appendChild(messageEl);
  modal.appendChild(button);
  overlay.appendChild(modal);
  
  return overlay;
}
