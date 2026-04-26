// ============================================
// ВЫДАЧА РОЛИ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр'
};

const ALL_ROLES = ['owner', 'staff', 'partner'];

export function render(user) {
  const div = document.createElement('div');
  div.className = 'grant-user';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Выдача роли';
  
  // Карточка пользователя
  const userCard = document.createElement('div');
  userCard.className = 'user-card';
  
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
  
  // Текущая роль
  const currentRole = document.createElement('span');
  currentRole.className = 'user-card__role';
  currentRole.textContent = user.role ? ROLE_LABELS[user.role] || user.role : 'Клиент';
  
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(currentRole);
  
  userCard.appendChild(avatar);
  userCard.appendChild(info);
  
  // Заголовок выбора роли
  const roleTitle = document.createElement('p');
  roleTitle.className = 'grant-user__role-title';
  roleTitle.textContent = 'Выберите новую роль:';
  
  // Список ролей (исключаем текущую)
  const availableRoles = ALL_ROLES.filter(r => r !== user.role);
  
  const roleList = document.createElement('div');
  roleList.className = 'grant-user__role-list';
  
  availableRoles.forEach(role => {
    const roleCard = document.createElement('div');
    roleCard.className = 'menu-item grant-user__role-card';
    roleCard.textContent = ROLE_LABELS[role];
    roleCard.addEventListener('click', () => {
      roleList.querySelectorAll('.grant-user__role-card').forEach(c => c.classList.remove('selected'));
      roleCard.classList.add('selected');
      roleCard.dataset.selected = role;
    });
    roleList.appendChild(roleCard);
  });
  
  // Кнопка сохранить
  const saveBtn = document.createElement('button');
  saveBtn.className = 'grant-user__save-btn';
  saveBtn.textContent = 'Сохранить';
  
  content.appendChild(title);
  content.appendChild(userCard);
  content.appendChild(roleTitle);
  content.appendChild(roleList);
  content.appendChild(saveBtn);
  div.appendChild(content);
  
  return div;
}
