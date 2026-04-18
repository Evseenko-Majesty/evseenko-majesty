// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И ТЕМЫ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();   // Сообщаем что приложение готово
  tg.expand();  // Растягиваем на весь экран
  
  // Устанавливаем тему при загрузке
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  // Меняем тему когда пользователь меняет её в Telegram
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
