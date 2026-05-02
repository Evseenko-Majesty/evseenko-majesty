export function initTelegram() {
  // Браузер
  if (!window.Telegram?.WebApp?.initData) {
    // Определяем тему системы
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    
    return {
      isTelegram: false,
      initDataUnsafe: {},
      BackButton: { show() {}, hide() {}, onClick() {} }
    };
  }
  
  // Telegram
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile && tg.requestFullscreen) {
    try { tg.requestFullscreen(); } catch (e) {}
  }
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
