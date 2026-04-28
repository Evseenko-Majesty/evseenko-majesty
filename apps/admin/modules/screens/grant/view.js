import { Header } from '/shared/components/Header.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр'
};

export function render(onNavigate, showGrantForm = false, users = [], onUserClick, onPermissionsClick) {
  const div = document.createElement('div');
  div.className = 'grant';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Доступ';
  
  content.appendChild(title);
  
  if (showGrantForm) {
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
    content.appendChild(grantCard);
  }
  
  if (users.length > 0) {
    const listTitle = document.createElement('p');
    listTitle.style.cssText = 'color: var(--text-color); font-size: 2vh; margin: 3vh 0 1.5vh 0; font-weight: 500;';
    listTitle.textContent = 'Сотрудники:';
    content.appendChild(listTitle);
    
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-search-card';
      card.innerHTML = `
        <div class="user-search-card__avatar">${user.first_name?.charAt(0) || '?'}</div>
        <div class="user-search-card__info">
          <span class="user-search-card__name">${user.first_name || ''} ${user.last_name || ''}</span>
          <span class="user-search-card__username">${ROLE_LABELS[user.role] || user.role}</span>
        </div>
        <span class="user-search-card__arrow">›</span>
      `;
      card.addEventListener('click', () => onPermisiionsClick(user));
      content.appendChild(card);
    });
  }
  
  div.appendChild(content);
  
  return div;
}
