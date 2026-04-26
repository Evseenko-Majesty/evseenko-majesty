// ============================================
// ГЛАВНАЯ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user, onProfileClick) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Профиль в шапке
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  div.appendChild(Header(userInfo));
  
  return div;
}
