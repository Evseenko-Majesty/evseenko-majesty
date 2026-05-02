export function initTelegram() {
  const tg = window.Telegram.WebApp;
  
  tg.ready();
  tg.expand();
  
  // Полный экран только на мобильных устройствах
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile && tg.requestFullscreen) {
    try {
      tg.requestFullscreen();
    } catch (e) {
      console.log('Fullscreen не поддерживается');
    }
  }
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return tg;
}
