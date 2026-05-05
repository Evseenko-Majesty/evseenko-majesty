// ============================================
// ВЫБОР ГОРОДА
// ============================================

import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { SearchCard } from '/shared/components/SearchCard.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'city-select';
  
  div.appendChild(PageTitle('Выбор города'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  // Поиск
  content.appendChild(SearchCard('Введите город...', (query) => {
    console.log('Поиск города:', query);
    // Логика поиска добавим позже
  }));
  
  div.appendChild(content);
  return div;
}
