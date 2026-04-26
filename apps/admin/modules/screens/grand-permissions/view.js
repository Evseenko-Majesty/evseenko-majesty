// ============================================
// ПРАВА ПОЛЬЗОВАТЕЛЯ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'grant-permissions';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Права доступа';
  
  const userName = document.createElement('p');
  userName.style.color = 'var(--text-secondary)';
  userName.textContent = `${user.first_name} ${user.last_name || ''}`;
  
  content.appendChild(title);
  content.appendChild(userName);
  div.appendChild(content);
  
  return div;
}
