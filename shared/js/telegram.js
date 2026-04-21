// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И ТЕМЫ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  
  // Устанавливаем тему при загрузке
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  // Меняем тему при изменении в Telegram
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
