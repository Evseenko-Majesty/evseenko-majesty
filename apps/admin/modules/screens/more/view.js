// ============================================
// СТРАНИЦА "ЕЩЁ" АДМИН-ПАНЕЛИ
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
  
  // Профиль
  const profileItem = document.createElement('div');
  profileItem.className = 'menu-item';
  profileItem.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"/>
        <path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"/>
      </svg>
    </span>
    <span>Профиль</span>
    <span class="menu-item__arrow">›</span>
  `;
  profileItem.addEventListener('click', () => onNavigate('profile'));

  // Дать доступ
const grantItem = document.createElement('div');
grantItem.className = 'menu-item';
grantItem.innerHTML = `
  <span class="menu-item__icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11c5.17 -0.85 9 -5.75 9 -11V7L12 2z"/>
      <path d="M9 12l2 2l4 -4"/>
    </svg>
  </span>
  <span>Дать доступ</span>
  <span class="menu-item__arrow">›</span>
`;
grantItem.addEventListener('click', () => onNavigate('grant'));

  
  content.appendChild(title);
  content.appendChild(profileItem);
  content.appendChild(grantItem);
  div.appendChild(content);
  
  return div;
}
