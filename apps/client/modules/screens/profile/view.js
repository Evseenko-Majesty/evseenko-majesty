// ============================================
// СТРАНИЦА ПРОФИЛЯ
// ============================================

import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'profile';
  
  div.appendChild(PageTitle('Профиль'));
  div.appendChild(Header(null));
  
  // Данные пользователя по центру
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  const userInfo = UserInfo(user, { showUsername: true });
  userInfo.classList.add('user-info--profile');  // Крупный стиль для профиля
  
  content.appendChild(userInfo);
  div.appendChild(content);
  
  return div;
}
