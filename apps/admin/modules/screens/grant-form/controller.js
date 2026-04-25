// ============================================
// ФОРМА ВЫДАЧИ ДОПУСКА — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class GrantFormScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const div = render();
    
    const input = div.querySelector('.search-card__input');
    const btn = div.querySelector('.search-card__btn');
    const resultArea = div.querySelector('.search-result');
    
    btn.addEventListener('click', async () => {
      const query = input.value.trim();
      if (query.length < 2) return;
      
      resultArea.innerHTML = '<p style="color: var(--text-secondary);">Поиск...</p>';
      
      const result = await API.searchUsers(query);
      
      if (result.success && result.users.length > 0) {
        resultArea.innerHTML = '';
        result.users.forEach(user => {
          const card = this.createUserCard(user);
          resultArea.appendChild(card);
        });
      } else {
        resultArea.innerHTML = '<p style="color: var(--text-secondary);">Никого не найдено</p>';
      }
    });
    
    return div;
  }
  
  createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
    card.addEventListener('click', () => {
  this.app.selectedUser = user;
  this.app.navigateTo('grant-user', false, user);
});
  
  // Аватар
  const avatar = document.createElement('div');
  avatar.className = 'user-card__avatar';
  
  if (user.photo_url) {
    const img = document.createElement('img');
    img.src = user.photo_url;
    img.className = 'user-card__avatar-img';
    img.alt = user.first_name || '';
    avatar.appendChild(img);
  } else {
    avatar.textContent = user.first_name?.charAt(0) || '?';
  }
  
  // Инфо
  const info = document.createElement('div');
  info.className = 'user-card__info';
  
  const name = document.createElement('span');
  name.className = 'user-card__name';
  name.textContent = `${user.first_name || ''} ${user.last_name || ''}`;
  
  const username = document.createElement('span');
  username.className = 'user-card__username';
  username.textContent = user.username ? '@' + user.username : 'ID: ' + user.telegram_id;
  
  info.appendChild(name);
  info.appendChild(username);
  
  // Стрелка
  const arrow = document.createElement('span');
  arrow.className = 'user-card__arrow';
  arrow.textContent = '›';
  
  card.appendChild(avatar);
  card.appendChild(info);
  card.appendChild(arrow);
  
  return card;
}
}
