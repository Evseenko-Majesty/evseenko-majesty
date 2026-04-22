// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И ТЕМЫ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  // Сообщаем Telegram что приложение готово
  tg.ready();
  
  // Растягиваем на весь экран
  tg.expand();
  
  // Устанавливаем тему при загрузке
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  // Меняем тему при изменении в Telegram
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}

// Показать кнопку "Назад"
export function showBackButton(tg, callback) {
  tg.BackButton.show();
  tg.BackButton.onClick(callback);
}

// Скрыть кнопку "Назад"
export function hideBackButton(tg) {
  tg.BackButton.hide();
}
