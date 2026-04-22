// ============================================
// СТРАНИЦА "ЕЩЁ" — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user, onNavigate) {
  const div = document.createElement('div');
  div.className = 'more';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Ещё';
  
  const profileItem = document.createElement('div');
  profileItem.className = 'menu-item';
  profileItem.textContent = 'Профиль';
  profileItem.addEventListener('click', () => onNavigate('profile'));
  
  content.appendChild(title);
  content.appendChild(profileItem);
  div.appendChild(content);
  
  return div;
}
