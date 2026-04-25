// ============================================
// ГЛАВНАЯ АДМИН-ПАНЕЛИ — ПРЕДСТАВЛЕНИЕ
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
  
  const content = document.createElement('div');
  content.className = 'page-content';
  div.appendChild(content);
  
  return div;
}
