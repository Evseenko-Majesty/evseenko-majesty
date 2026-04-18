// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И РАБОТА С WEBAPP
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  // Сообщаем Telegram, что приложение готово
  tg.ready();
  
  // Растягиваем на весь экран
  tg.expand();
  
  // Устанавливаем тему при загрузке
  const theme = tg.colorScheme; // 'light' или 'dark'
  document.documentElement.setAttribute('data-theme', theme);
  
  // Слушаем смену темы в реальном времени
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}

// Показать кнопку "Назад" в Telegram
export function setupBackButton(tg, callback) {
  tg.BackButton.show();
  tg.BackButton.onClick(callback);
}

// Скрыть кнопку "Назад"
export function hideBackButton(tg) {
  tg.BackButton.hide();
}
