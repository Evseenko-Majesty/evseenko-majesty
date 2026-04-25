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
    card.innerHTML = `
      <span class="user-card__avatar">${user.first_name?.charAt(0) || '?'}</span>
      <div class="user-card__info">
        <span class="user-card__name">${user.first_name || ''} ${user.last_name || ''}</span>
        <span class="user-card__username">${user.username ? '@' + user.username : 'ID: ' + user.telegram_id}</span>
      </div>
      <span class="user-card__arrow">›</span>
    `;
    return card;
  }
}
