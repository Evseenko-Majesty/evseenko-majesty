// ============================================
// ПРАВА ПОЛЬЗОВАТЕЛЯ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'grant-permissions';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Права доступа';
  
  const userName = document.createElement('p');
  userName.style.cssText = 'color: var(--text-secondary); font-size: 2vh;';
  userName.textContent = `${user.first_name || ''} ${user.last_name || ''}`;
  
  content.appendChild(title);
  content.appendChild(userName);
  div.appendChild(content);
  
  return div;
}
