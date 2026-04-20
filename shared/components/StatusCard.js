// ============================================
// СТАТУС-КАРТОЧКА — КОМПОНЕНТ
// Создаёт HTML-элемент статус-карточки
// ============================================

export function StatusCard() {
  
  // 1. Создаём главный контейнер (капсула)
  const div = document.createElement('div');
  div.className = 'status-card';  // Класс из components.css
  
  // 2. Создаём контейнер для иконки
  const indicator = document.createElement('div');
  indicator.className = 'status-card__indicator';
  
  // 3. Вставляем SVG иконку загрузки (по умолчанию)
  //    currentColor наследует цвет из CSS (.status-card__indicator)
  indicator.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <use href="/shared/assets/icons/sprite.svg#status-loading"></use>
    </svg>
  `;
  
  // 4. Создаём элемент для текста статуса
  const text = document.createElement('span');
  text.className = 'status-card__text';
  text.textContent = 'Подключение';  // Начальный текст
  
  // 5. Собираем всё вместе
  div.appendChild(indicator);
  div.appendChild(text);
  
  // 6. Возвращаем и контейнер, и ссылки на внутренние элементы
  //    Это нужно чтобы потом менять текст и иконку из контроллера
  return { 
    div,        // Сам контейнер (для добавления на страницу)
    indicator,  // Контейнер иконки (чтобы менять иконку)
    text        // Текстовый элемент (чтобы менять текст)
  };
}
