// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И АВТО-ТЕМА
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  
  if (tg.requestFullscreen) {
    tg.requestFullscreen();
  }
  
  // Устанавливаем тему при загрузке
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  // Меняем тему когда пользователь меняет её в Telegram
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
