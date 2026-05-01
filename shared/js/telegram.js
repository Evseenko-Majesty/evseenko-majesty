// Инициализация Telegram WebApp
export function initTelegram() {
  const tg = window.Telegram.WebApp;
  tg.ready();    // Сообщаем "готов"
  tg.expand();   // На весь экран
  return tg;
}
