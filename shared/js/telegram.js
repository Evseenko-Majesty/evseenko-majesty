// ============================================
// TELEGRAM — ИНИЦИАЛИЗАЦИЯ И ТЕМЫ
// ============================================

export function initTelegram() {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  return tg;
}

// Просто показать кнопку и задать что делать
export function setBackButton(tg, callback) {
  tg.BackButton.show();
  tg.BackButton.onClick(callback);
}

// Скрыть кнопку
export function hideBackButton(tg) {
  tg.BackButton.hide();
}
