// ============================================
// ГЛАВНАЯ АДМИН-ПАНЕЛИ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр'
};

export function render(user, onProfileClick) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Профиль в шапке
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  // Роль (только в админке)
  const roleLabel = document.createElement('div');
  roleLabel.className = 'user-info__role user-info__role--header';
  roleLabel.textContent = ROLE_LABELS[user?.role] || '';
  userInfo.querySelector('.user-info__text').appendChild(roleLabel);
  
  // Шапка
  const header = Header(userInfo);
  div.appendChild(header);
  
  // Контент
  const content = document.createElement('div');
  content.className = 'page-content';
  div.appendChild(content);
  
  return div;
}
