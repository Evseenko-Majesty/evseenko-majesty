// ============================================
// TELEGRAM — ЗАГРУЗКА SDK И ИНИЦИАЛИЗАЦИЯ
// ============================================

export async function initTelegram() {
  // Проверяем, открыто ли в Telegram
  const isTelegram = !!(window.Telegram?.WebApp?.initData);
  
  if (!isTelegram) {
    // Браузер — возвращаем заглушку
    return { isTelegram: false, user: null };
  }
  
  // Загружаем SDK если ещё не загружен
  if (!window.Telegram?.WebApp?.ready) {
    await loadScript('https://telegram.org/js/telegram-web-app.js');
  }
  
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  document.documentElement.setAttribute('data-theme', tg.colorScheme);
  tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
  });
  
  return { ...tg, isTelegram: true };
}

// Загрузка внешнего скрипта
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
