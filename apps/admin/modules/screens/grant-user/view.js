// ============================================
// ВЫДАЧА РОЛИ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

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
  userCard.innerHTML = `
    <div class="user-card__avatar">${user.first_name?.charAt(0) || '?'}</div>
    <div class="user-card__info">
      <span class="user-card__name">${user.first_name || ''} ${user.last_name || ''}</span>
      <span class="user-card__username">${user.username ? '@' + user.username : 'ID: ' + user.telegram_id}</span>
    </div>
  `;
  
  // Заголовок выбора роли
  const roleTitle = document.createElement('p');
  roleTitle.className = 'grant-user__role-title';
  roleTitle.textContent = 'Выберите роль:';
  
  // Список ролей
  const roles = ['staff', 'partner'];
  const roleLabels = { staff: 'Сотрудник', partner: 'Партнёр' };
  
  const roleList = document.createElement('div');
  roleList.className = 'grant-user__role-list';
  
  roles.forEach(role => {
    const roleCard = document.createElement('div');
    roleCard.className = 'menu-item grant-user__role-card';
    roleCard.textContent = roleLabels[role];
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
