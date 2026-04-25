// ============================================
// ФОРМА ВЫДАЧИ ДОПУСКА — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'grant-form';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Дать допуск';
  
  // Карточка поиска
  const searchCard = document.createElement('div');
  searchCard.className = 'search-card';
  
  const searchInput = document.createElement('input');
  searchInput.className = 'search-card__input';
  searchInput.placeholder = 'Имя, username или ID...';
  
  const searchBtn = document.createElement('button');
  searchBtn.className = 'search-card__btn';
  searchBtn.textContent = 'Поиск';
  
  searchCard.appendChild(searchInput);
  searchCard.appendChild(searchBtn);
  
  // Результат поиска (пока пусто)
  const resultArea = document.createElement('div');
  resultArea.className = 'search-result';
  
  content.appendChild(title);
  content.appendChild(searchCard);
  content.appendChild(resultArea);
  div.appendChild(content);
  
  return div;
}
