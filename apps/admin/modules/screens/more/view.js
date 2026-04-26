// ============================================
// СТРАНИЦА "ЕЩЁ"
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user, onNavigate) {
  const div = document.createElement('div');
  div.className = 'more';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Ещё';
  
  // Пункт Профиль
  const profileItem = document.createElement('div');
  profileItem.className = 'menu-item';
  profileItem.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"/><path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"/></svg>
    </span>
    <span>Профиль</span>
    <span class="menu-item__arrow">›</span>
  `;
  profileItem.addEventListener('click', () => onNavigate('profile'));
  
  content.appendChild(title);
  content.appendChild(profileItem);
  div.appendChild(content);
  
  return div;
}
