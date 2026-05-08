// ============================================
// ВЫДАЧА РОЛИ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { UserSearch } from '/shared/components/UserSearch.js';

export function render(onSearch) {
  const div = document.createElement('div');
  div.className = 'grant-form';
  
  div.appendChild(PageTitle('Выдача роли'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  // Поиск пользователей
  content.appendChild(UserSearch('Имя, username или ID...', onSearch));
  
  // Область результатов
  const resultArea = document.createElement('div');
  resultArea.className = 'search-result';
  content.appendChild(resultArea);
  
  div.appendChild(content);
  return div;
}
