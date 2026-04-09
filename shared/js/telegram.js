// ============================================
// РАБОТА С TELEGRAM WEBAPP
// ============================================

// Получить объект Telegram WebApp
export function getTelegram() {
    return window.Telegram?.WebApp;
}

// Раскрыть приложение на весь экран
export function expandApp() {
    const tg = getTelegram();
    if (tg) {
        tg.expand();   // раскрывает на весь экран
    }
}

// Сообщить Telegram, что приложение готово
export function ready() {
    const tg = getTelegram();
    if (tg) {
        tg.ready();
    }
}
