// ============================================
// ГЛАВНЫЙ ЭКРАН
// ============================================

import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Профиль в шапке (аватар, имя, username)
  const userInfo = UserInfo(user, { showUsername: true });
  
  // Шапка с профилем справа
  div.appendChild(Header(userInfo));
  
  return div;
}
