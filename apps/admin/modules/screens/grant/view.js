// ============================================
// СТРАНИЦА "ДОСТУП" — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user, onNavigate) {
  const div = document.createElement('div');
  div.className = 'grant';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Доступ';
  
  // Карточка "Дать допуск"
  const grantCard = document.createElement('div');
  grantCard.className = 'menu-item';
  grantCard.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/>
        <line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    </span>
    <span>Дать допуск</span>
    <span class="menu-item__arrow">›</span>
  `;
  grantCard.addEventListener('click', () => onNavigate('grantform'));
  
  content.appendChild(title);
  content.appendChild(grantCard);
  div.appendChild(content);
  
  return div;
}
