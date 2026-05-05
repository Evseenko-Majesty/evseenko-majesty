import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { UserInfo } from '/shared/components/UserInfo.js';
import { MenuItem } from '/shared/components/MenuItem.js';

export function render(user, onNavigate) {
  const div = document.createElement('div');
  div.className = 'profile';
  
  div.appendChild(PageTitle('Профиль'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  const userInfo = UserInfo(user, { showUsername: true });
  userInfo.classList.add('user-info--profile');
  content.appendChild(userInfo);
  
  // Карточка выбора города
  const cityIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>';
  content.appendChild(MenuItem('Выбрать город', cityIcon, () => onNavigate('cityselect')));
  
  div.appendChild(content);
  return div;
}
