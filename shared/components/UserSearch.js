// ============================================
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ — ОБЩИЙ КОМПОНЕНТ
// ============================================

export function UserSearch(placeholder, onSearch) {
  const card = document.createElement('div');
  card.className = 'search-card';
  
  const input = document.createElement('input');
  input.className = 'search-card__input';
  input.placeholder = placeholder;
  
  const btn = document.createElement('button');
  btn.className = 'search-card__btn';
  btn.textContent = 'Поиск';
  btn.addEventListener('click', () => onSearch(input.value));
  
  card.appendChild(input);
  card.appendChild(btn);
  return card;
}
