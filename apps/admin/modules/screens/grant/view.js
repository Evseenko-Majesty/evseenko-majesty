// ============================================
// СТРАНИЦА "ДОСТУП" — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user, staffUsers, onNavigate, onUserClick) {
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
  grantCard.addEventListener('click', () => onNavigate('grantForm'));
  
  content.appendChild(title);
  content.appendChild(grantCard);
  
  // Список сотрудников
  if (staffUsers && staffUsers.length > 0) {
    const staffTitle = document.createElement('p');
    staffTitle.className = 'grant-user__role-title';
    staffTitle.textContent = 'Сотрудники и партнёры:';
    content.appendChild(staffTitle);
    
    staffUsers.forEach(u => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <div class="user-card__avatar">${u.first_name?.charAt(0) || '?'}</div>
        <div class="user-card__info">
          <span class="user-card__name">${u.first_name || ''} ${u.last_name || ''}</span>
          <span class="user-card__username">${u.role ? ROLE_LABELS[u.role] || u.role : ''}</span>
        </div>
        <span class="user-card__arrow">›</span>
      `;
      card.addEventListener('click', () => onUserClick(u));
      content.appendChild(card);
    });
  }
  
  div.appendChild(content);
  
  return div;
}

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр'
};
