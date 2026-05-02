export function initTelegram() {
  if (!window.Telegram?.WebApp?.initData) {
    return {
      isTelegram: false,
      initDataUnsafe: {},
      BackButton: { show() {}, hide() {}, onClick() {} }
    };
  }
  
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  if (tg.requestFullscreen) tg.requestFullscreen();
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  // Добавляем флаг, не заменяя объект
  tg.isTelegram = true;
  return tg;
}
