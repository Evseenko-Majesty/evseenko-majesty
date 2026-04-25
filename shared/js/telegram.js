export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  
  // Запрещаем вертикальные свайпы и фиксируем размер
  tg.disableVerticalSwipes();
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
