import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user, isTelegram) {
  const div = document.createElement('div');
  div.className = 'home page-with-header';
  
  let rightContent;
  
  if (isTelegram && user) {
    // Telegram — профиль
    rightContent = UserInfo(user, { showUsername: true, showRole: false });
  } else {
    // Браузер — кнопка входа
    rightContent = document.createElement('button');
    rightContent.textContent = 'Войти';
    rightContent.className = 'btn-login';
    rightContent.addEventListener('click', () => {
      // Открыть бота в Telegram
      window.open('https://t.me/EvseenkoMajestyBot', '_blank');
    });
  }
  
  div.appendChild(Header(rightContent));
  
  return div;
}
