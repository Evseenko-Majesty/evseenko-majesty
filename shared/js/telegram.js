// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  // Сообщаем Telegram что приложение готово
  tg.ready();
  
  // Растягиваем на весь экран
  tg.expand();
  
  return tg;
}
