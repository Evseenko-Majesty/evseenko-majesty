// ============================================
// ПРОФИЛЬ АДМИН-ПАНЕЛИ
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'profile';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Профиль';
  
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--profile');
  
  content.appendChild(title);
  content.appendChild(userInfo);
  div.appendChild(content);
  
  return div;
}
