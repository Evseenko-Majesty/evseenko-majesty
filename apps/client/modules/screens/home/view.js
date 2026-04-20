// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Логотип — абсолютное позиционирование
  const logo = Logo();
  logo.classList.add('page-logo');
  div.appendChild(logo);
  
  // Профиль — абсолютное позиционирование
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  div.appendChild(userInfo);
  
  return div;
}
