export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  tg.disableVerticalSwipes();
  
  // Фиксируем высоту при открытии клавиатуры
  tg.Viewport?.disable?.();
  
  // Сохраняем исходную высоту
  const originalHeight = window.innerHeight;
  
  tg.onEvent('viewportChanged', ({ height }) => {
    // Игнорируем изменения высоты
    document.body.style.height = originalHeight + 'px';
  });
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
