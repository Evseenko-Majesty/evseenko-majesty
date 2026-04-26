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
          resultArea.appendChild(this.createUserCard(user));
        });
      } else {
        resultArea.innerHTML = '<p style="color: var(--text-secondary);">Никого не найдено</p>';
      }
    });
    
    return div;
  }
  
  createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-search-card';
    
    const avatar = document.createElement('div');
    avatar.className = 'user-search-card__avatar';
    if (user.photo_url) {
      const img = document.createElement('img');
      img.src = user.photo_url;
      img.className = 'user-search-card__avatar-img';
      avatar.appendChild(img);
    } else {
      avatar.textContent = user.first_name?.charAt(0) || '?';
    }
    
    const info = document.createElement('div');
    info.className = 'user-search-card__info';
    
    const name = document.createElement('span');
    name.className = 'user-search-card__name';
    name.textContent = `${user.first_name || ''} ${user.last_name || ''}`;
    
    const username = document.createElement('span');
    username.className = 'user-search-card__username';
    username.textContent = user.username ? '@' + user.username : 'ID: ' + user.telegram_id;
    
    info.appendChild(name);
    info.appendChild(username);
    
    const arrow = document.createElement('span');
    arrow.className = 'user-search-card__arrow';
    arrow.textContent = '›';
    
    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(arrow);
    
    return card;
  }
}
