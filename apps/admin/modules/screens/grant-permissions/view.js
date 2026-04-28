// ============================================
// ПРАВА ПОЛЬЗОВАТЕЛЯ
// ============================================

import { Header } from '/shared/components/Header.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр',
  client: 'Клиент'
};

export function render(user) {
  const div = document.createElement('div');
  div.className = 'grant-permissions';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Права доступа';
  
  // Большая карточка пользователя
  const card = document.createElement('div');
  card.className = 'user-detail-card';
  
  // Аватар крупный
  const avatar = document.createElement('div');
  avatar.className = 'user-detail-card__avatar';
  if (user.photo_url) {
    const img = document.createElement('img');
    img.src = user.photo_url;
    img.className = 'user-detail-card__avatar-img';
    avatar.appendChild(img);
  } else {
    avatar.textContent = user.first_name?.charAt(0) || '?';
  }
  
  // Инфо
  const info = document.createElement('div');
  info.className = 'user-detail-card__info';
  
  const name = document.createElement('div');
  name.className = 'user-detail-card__name';
  name.textContent = `${user.first_name || ''} ${user.last_name || ''}`;
  
  const username = document.createElement('div');
  username.className = 'user-detail-card__username';
  username.textContent = user.username ? '@' + user.username : 'ID: ' + user.telegram_id;
  
  const role = document.createElement('div');
  role.className = 'user-detail-card__role';
  role.textContent = ROLE_LABELS[user.role] || user.role || 'Клиент';
  
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(role);
  
  card.appendChild(avatar);
  card.appendChild(info);
  
  content.appendChild(title);
  content.appendChild(card);
  div.appendChild(content);
  
  return div;
}
