export function initTelegram() {
  if (!window.Telegram?.WebApp?.initData) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    return { isTelegram: false, initDataUnsafe: {}, BackButton: { show(){}, hide(){}, onClick(){} }, isDesktopFullscreen: false };
  }
  
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (tg.requestFullscreen) {
    try { tg.requestFullscreen(); } catch (e) {}
  }
  
  // Определяем ПК в fullscreen
  const isFullscreen = tg.isExpanded;
  const isDesktopFullscreen = !isMobile && isFullscreen;
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return { ...tg, isDesktopFullscreen };
}
