export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes();
  
  // Фиксируем высоту при загрузке в CSS-переменной
  const setHeight = () => {
    document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
  };
  setHeight();
  
  // При изменении вьюпорта — не меняем высоту
  tg.onEvent('viewportChanged', () => {
    // Ничего не делаем, оставляем исходную высоту
  });
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
