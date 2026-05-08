import { render } from './view.js';
import { UsersAPI } from '/shared/js/api/users.js';

export class GrantFormScreen {
  constructor(app) { this.app = app; }
  
  getElement() {
    const div = render(async (query) => {
      if (query.length < 2) return;
      
      const resultArea = div.querySelector('.search-result');
      resultArea.innerHTML = '<p style="color: var(--text-secondary);">Поиск...</p>';
      
      const res = await UsersAPI.searchUsers(query);
      
      resultArea.innerHTML = '';
      if (res.success && res.users.length > 0) {
        res.users.forEach(user => {
          resultArea.appendChild(this.createUserCard(user, (u) => {
            console.log('Выбран пользователь:', u);
          }));
        });
      } else {
        resultArea.innerHTML = '<p style="color: var(--text-secondary);">Никого не найдено</p>';
      }
    });
    
    return div;
  }
  
  createUserCard(user, onClick) {
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
    info.appendChild(name);
    
    const arrow = document.createElement('span');
    arrow.className = 'user-search-card__arrow';
    arrow.textContent = '›';
    
    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(arrow);
    card.addEventListener('click', () => onClick(user));
    
    return card;
  }
}
