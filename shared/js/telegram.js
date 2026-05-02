export function initTelegram() {
  // Браузер — тема системы, заглушка
  if (!window.Telegram?.WebApp?.initData) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    return {
      isTelegram: false,
      initDataUnsafe: {},
      BackButton: { show() {}, hide() {}, onClick() {} }
    };
  }
  
  // Telegram — всегда fullscreen
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  if (tg.requestFullscreen) {
    try { tg.requestFullscreen(); } catch (e) {}
  }
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
