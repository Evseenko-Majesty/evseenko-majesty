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
  
  // ============================================
  // БОЛЬШАЯ КАРТОЧКА ПОЛЬЗОВАТЕЛЯ
  // ============================================
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
  
  // ============================================
  // ДОЛЖНОСТЬ
  // ============================================
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
  
  // ============================================
  // ДОСТУП К СТРАНИЦЕ "ДОСТУП"
  // ============================================
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
  
  // ============================================
  // ДОСТУП К "ДАТЬ ДОПУСК"
  // ============================================
  const grantFormSectionTitle = document.createElement('p');
  grantFormSectionTitle.className = 'permissions-section-title';
  grantFormSectionTitle.textContent = 'Доступ к странице «Дать допуск»';
  
  const grantFormToggle = document.createElement('div');
  grantFormToggle.className = 'permissions-toggle';
  
  const grantFormLabel = document.createElement('span');
  grantFormLabel.textContent = 'Дать доступ';
  grantFormLabel.className = 'permissions-toggle__label';
  
  const grantFormCheckbox = document.createElement('input');
  grantFormCheckbox.type = 'checkbox';
  grantFormCheckbox.className = 'permissions-toggle__checkbox';
  grantFormCheckbox.checked = user.hasGrantFormAccess || false;
  
  grantFormToggle.appendChild(grantFormLabel);
  grantFormToggle.appendChild(grantFormCheckbox);
  
  const grantFormSaveBtn = document.createElement('button');
  grantFormSaveBtn.className = 'search-card__btn permissions-save-btn';
  grantFormSaveBtn.textContent = 'Сохранить';
  
  // ============================================
  // ВЫБОР РОЛЕЙ ДЛЯ ВЫДАЧИ
  // ============================================
  const grantRoleTitle = document.createElement('p');
  grantRoleTitle.className = 'permissions-section-title';
  grantRoleTitle.textContent = 'Может давать роли:';
  grantRoleTitle.style.display = grantFormCheckbox.checked ? 'block' : 'none';
  
  const rolesContainer = document.createElement('div');
  rolesContainer.className = 'permissions-roles';
  rolesContainer.style.display = grantFormCheckbox.checked ? 'flex' : 'none';
  
  const roles = ['owner', 'staff', 'partner', 'client'];
  
  roles.forEach(role => {
    const roleBtn = document.createElement('div');
    roleBtn.className = 'permissions-role';
    roleBtn.textContent = ROLE_LABELS[role];
    roleBtn.dataset.role = role;
    if (user.grantRoles && user.grantRoles.includes(role)) roleBtn.classList.add('active');
    roleBtn.addEventListener('click', () => roleBtn.classList.toggle('active'));
    rolesContainer.appendChild(roleBtn);
  });
  
  const rolesSaveBtn = document.createElement('button');
  rolesSaveBtn.className = 'search-card__btn permissions-save-btn';
  rolesSaveBtn.textContent = 'Сохранить роли';
  rolesSaveBtn.style.display = grantFormCheckbox.checked ? 'block' : 'none';
  
  grantFormCheckbox.addEventListener('change', () => {
    const show = grantFormCheckbox.checked;
    grantRoleTitle.style.display = show ? 'block' : 'none';
    rolesContainer.style.display = show ? 'flex' : 'none';
    rolesSaveBtn.style.display = show ? 'block' : 'none';
  });
  
  // ============================================
  // СБОРКА
  // ============================================
  content.appendChild(title);
  content.appendChild(card);
  content.appendChild(sectionTitle);
  content.appendChild(positionInput);
  content.appendChild(saveBtn);
  content.appendChild(accessSectionTitle);
  content.appendChild(accessToggle);
  content.appendChild(accessSaveBtn);
  content.appendChild(grantFormSectionTitle);
  content.appendChild(grantFormToggle);
  content.appendChild(grantFormSaveBtn);
  content.appendChild(grantRoleTitle);
  content.appendChild(rolesContainer);
  content.appendChild(rolesSaveBtn);
  div.appendChild(content);
  
  return div;
}
