export function initTelegram() {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  const theme = tg.colorScheme;
  document.documentElement.setAttribute('data-theme', theme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  return tg;
}

export function setupBackButton(tg, onBack) {
  tg.BackButton.show();
  tg.BackButton.onClick(onBack);
}

export function hideBackButton(tg) {
  tg.BackButton.hide();
}
