// ============================================
// ВЫДАЧА РОЛИ
// ============================================

import { Header } from '/shared/components/Header.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр',
  client: 'Клиент'
};

export function render(selectedUser, availableRoles, onRoleSelect, onSave) {
  const div = document.createElement('div');
  div.className = 'grant-user';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Выдача роли';
  
  // Карточка пользователя
  const userCard = document.createElement('div');
  userCard.className = 'user-search-card';
  
  const avatar = document.createElement('div');
  avatar.className = 'user-search-card__avatar';
  if (selectedUser.photo_url) {
    const img = document.createElement('img');
    img.src = selectedUser.photo_url;
    img.className = 'user-search-card__avatar-img';
    avatar.appendChild(img);
  } else {
    avatar.textContent = selectedUser.first_name?.charAt(0) || '?';
  }
  
  const info = document.createElement('div');
  info.className = 'user-search-card__info';
  
  const name = document.createElement('span');
  name.className = 'user-search-card__name';
  name.textContent = `${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`;
  
  const username = document.createElement('span');
  username.className = 'user-search-card__username';
  username.textContent = selectedUser.username ? '@' + selectedUser.username : 'ID: ' + selectedUser.telegram_id;
  
  // Текущая роль
  const currentRole = document.createElement('span');
  currentRole.style.cssText = 'color: var(--accent-color); font-size: 1.4vh; font-weight: 500;';
  currentRole.textContent = ROLE_LABELS[selectedUser.role] || selectedUser.role || 'Клиент';
  
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(currentRole);
  
  userCard.appendChild(avatar);
  userCard.appendChild(info);
  
  // Выбор роли
  const roleTitle = document.createElement('p');
  roleTitle.style.cssText = 'color: var(--text-color); font-size: 2vh; margin: 3vh 0 1.5vh 0; font-weight: 500;';
  roleTitle.textContent = 'Выберите новую роль:';
  
  const roleList = document.createElement('div');
  
  availableRoles.forEach(role => {
    const roleCard = document.createElement('div');
    roleCard.className = 'menu-item';
    roleCard.textContent = ROLE_LABELS[role];
    roleCard.addEventListener('click', () => {
      roleList.querySelectorAll('.menu-item').forEach(c => c.style.borderColor = 'var(--accent-color)');
      roleCard.style.borderColor = '#4A9E7A';
      onRoleSelect(role);
    });
    roleList.appendChild(roleCard);
  });
  
  // Кнопка сохранить
  const saveBtn = document.createElement('button');
  saveBtn.className = 'search-card__btn';
  saveBtn.textContent = 'Сохранить';
  saveBtn.style.width = '100%';
  saveBtn.style.marginTop = '2vh';
  saveBtn.addEventListener('click', onSave);
  
  content.appendChild(title);
  content.appendChild(userCard);
  content.appendChild(roleTitle);
  content.appendChild(roleList);
  content.appendChild(saveBtn);
  div.appendChild(content);
  
  return div;
}
