// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  
  if (tg.requestFullscreen) {
    tg.requestFullscreen();
  }
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
