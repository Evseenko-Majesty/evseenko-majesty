import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user, onProfileClick) {
  const div = document.createElement('div');
  div.className = 'home';
  
  const userInfo = UserInfo(user, { showUsername: true });
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  div.appendChild(Header(userInfo));
  return div;
}
