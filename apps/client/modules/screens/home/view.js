// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user, onProfileClick) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Профиль в шапке (кликабельный)
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  // Шапка с логотипом слева и профилем справа
  const header = Header(userInfo);
  div.appendChild(header);
  
  // Контент главной (пока пусто, можно добавить)
  const content = document.createElement('div');
  content.className = 'page-content';
  div.appendChild(content);
  
  return div;
}
