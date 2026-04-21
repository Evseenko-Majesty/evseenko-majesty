// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Создаём правый контент — профиль пользователя
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  
  // Шапка с логотипом и профилем
  const header = Header(userInfo);
  div.appendChild(header);
  
  return div;
}
