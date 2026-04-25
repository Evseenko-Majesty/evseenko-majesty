// ============================================
// ПРОФИЛЬ АДМИН-ПАНЕЛИ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр'
};

export function render(user) {
  const div = document.createElement('div');
  div.className = 'profile';
  
  // Шапка
  const header = Header(null);
  div.appendChild(header);
  
  // Контент
  const content = document.createElement('div');
  content.className = 'page-content';
  
  // Заголовок
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Профиль';
  
  // Данные пользователя
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--profile');
  
  // Роль (только в админке)
  const roleLabel = document.createElement('div');
  roleLabel.className = 'user-info__role user-info__role--profile';
  roleLabel.textContent = ROLE_LABELS[user?.role] || '';
  userInfo.querySelector('.user-info__text').appendChild(roleLabel);
  
  content.appendChild(title);
  content.appendChild(userInfo);
  div.appendChild(content);
  
  return div;
}
