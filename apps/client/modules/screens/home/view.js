import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';
import { AuthAPI } from '/shared/js/api/auth.js';

export function render(user, isTelegram) {
  const div = document.createElement('div');
  div.className = 'home page-with-header';
  
  let rightContent;
  
  if (isTelegram && user) {
    rightContent = UserInfo(user, { showUsername: true, showRole: false });
  } else if (user) {
    // Браузер, уже вошёл
    rightContent = UserInfo(user, { showUsername: true, showRole: false });
  } else {
    // Браузер, не вошёл — кнопка "Войти через Telegram"
    const loginBtn = document.createElement('button');
    loginBtn.textContent = 'Войти через Telegram';
    loginBtn.className = 'btn-login';
    loginBtn.addEventListener('click', async () => {
      // 1. Получаем токен с сервера
      const res = await AuthAPI.createBrowserToken();
      if (!res.success) return;
      
      const token = res.token;
      const botUrl = `https://t.me/EvseenkoMajestyBot?start=${token}`;
      
      // 2. Открываем бота
      window.open(botUrl, '_blank');
      
      // 3. Ждём входа (опрашиваем сервер)
      loginBtn.textContent = 'Ожидание входа...';
      loginBtn.disabled = true;
      
      const checkInterval = setInterval(async () => {
        const checkRes = await AuthAPI.checkToken(token);
        if (checkRes.success) {
          clearInterval(checkInterval);
          // Вход выполнен — обновляем страницу
          window.location.reload();
        }
      }, 2000);  // Проверяем каждые 2 секунды
    });
    
    rightContent = loginBtn;
  }
  
  div.appendChild(Header(rightContent));
  return div;
}
