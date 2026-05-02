// ============================================
// TELEGRAM — БЕЗОПАСНАЯ ИНИЦИАЛИЗАЦИЯ
// ============================================

export function initTelegram() {
  // Проверяем, есть ли Telegram API
  if (!window.Telegram?.WebApp?.initData) {
    // Браузер — возвращаем заглушку без ошибок
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
  
  return { ...tg, isTelegram: true };
}
