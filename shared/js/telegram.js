const tg = window.Telegram?.WebApp;

export function initTelegram() {
    if (tg) {
        tg.expand();
        tg.ready();
    }
}

export function getUser() {
    return tg?.initDataUnsafe?.user || null;
}

export function getTheme() {
    return tg?.colorScheme || 'light';
}

export function close() {
    tg?.close();
}
