// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  // Сообщаем Telegram что приложение готово
  tg.ready();
  
  // Раскрываем на весь экран
  tg.expand();
  
  // Запрашиваем полный Fullscreen
  if (tg.requestFullscreen) {
    tg.requestFullscreen();
  }
  
  return tg;
}
