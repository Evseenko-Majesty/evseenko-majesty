// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user, onProfileClick) {
  const div = document.createElement('div');
  div.className = 'home';
  
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  const header = Header(userInfo);
  div.appendChild(header);
  
  return div;
}
