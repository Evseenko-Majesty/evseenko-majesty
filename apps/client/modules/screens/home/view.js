import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'home page-with-header';
  
  // Профиль в шапке (только аватар и имя)
  const userInfo = UserInfo(user, { showUsername: true, showRole: false });
  
  // Шапка с профилем справа
  div.appendChild(Header(userInfo));
  
  return div;
}
