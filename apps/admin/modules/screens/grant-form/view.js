// ============================================
// ДАТЬ ДОПУСК
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'grant-form';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Дать допуск';
  
  // Поиск
  const searchCard = document.createElement('div');
  searchCard.className = 'search-card';
  
  const input = document.createElement('input');
  input.className = 'search-card__input';
  input.placeholder = 'Имя, username или ID...';
  
  const btn = document.createElement('button');
  btn.className = 'search-card__btn';
  btn.textContent = 'Поиск';
  
  searchCard.appendChild(input);
  searchCard.appendChild(btn);
  
  const resultArea = document.createElement('div');
  resultArea.className = 'search-result';
  
  content.appendChild(title);
  content.appendChild(searchCard);
  content.appendChild(resultArea);
  div.appendChild(content);
  
  return div;
}
