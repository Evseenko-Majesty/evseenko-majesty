// Модальное окно — всплывает по центру экрана
export function Modal(title, message, buttonText, onButtonClick) {
  
  // Затемнение фона
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  // Само окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  // Заголовок, сообщение, кнопка
  modal.innerHTML = `
    <h3 class="modal__title">${title}</h3>
    <p class="modal__message">${message}</p>
    <button className="btn modal__button">${buttonText}</button>
  `;
  
  // При клике на кнопку — вызываем переданную функцию
  modal.querySelector('button').addEventListener('click', onButtonClick);
  
  overlay.appendChild(modal);
  return overlay;
}
