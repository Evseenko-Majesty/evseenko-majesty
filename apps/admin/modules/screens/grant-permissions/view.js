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
  
  const position = document.createElement('div');
  position.className = 'user-detail-card__position';
  position.textContent = user.position || '';
  
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(role);
  info.appendChild(position);
  
  card.appendChild(avatar);
  card.appendChild(info);
  
  // Раздел: Должность
  const sectionTitle = document.createElement('p');
  sectionTitle.className = 'permissions-section-title';
  sectionTitle.textContent = 'Должность';
  
  const positionInput = document.createElement('input');
  positionInput.className = 'search-card__input permissions-input';
  positionInput.placeholder = 'Например: Администратор точки 1';
  positionInput.value = user.position || '';
  
  const saveBtn = document.createElement('button');
  saveBtn.className = 'search-card__btn permissions-save-btn';
  saveBtn.textContent = 'Сохранить';
  
  // Раздел: Доступ к странице "Доступ"
  const accessSectionTitle = document.createElement('p');
  accessSectionTitle.className = 'permissions-section-title';
  accessSectionTitle.textContent = 'Доступ к странице «Доступ»';
  
  const accessToggle = document.createElement('div');
  accessToggle.className = 'permissions-toggle';
  
  const accessLabel = document.createElement('span');
  accessLabel.textContent = 'Дать доступ';
  accessLabel.className = 'permissions-toggle__label';
  
  const accessCheckbox = document.createElement('input');
  accessCheckbox.type = 'checkbox';
  accessCheckbox.className = 'permissions-toggle__checkbox';
  accessCheckbox.checked = user.hasGrantAccess || false;
  
  accessToggle.appendChild(accessLabel);
  accessToggle.appendChild(accessCheckbox);
  
  const accessSaveBtn = document.createElement('button');
  accessSaveBtn.className = 'search-card__btn permissions-save-btn';
  accessSaveBtn.textContent = 'Сохранить доступ';
  
  content.appendChild(title);
  content.appendChild(card);
  content.appendChild(sectionTitle);
  content.appendChild(positionInput);
  content.appendChild(saveBtn);
  content.appendChild(accessSectionTitle);
  content.appendChild(accessToggle);
  content.appendChild(accessSaveBtn);
  div.appendChild(content);
  
  return div;
}
