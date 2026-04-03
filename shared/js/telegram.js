export function initTelegram() {
    const tg = window.Telegram?.WebApp;
    if (tg) {
        tg.expand();
        tg.ready();
    }
    return tg;
}

export function getUser() {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
}

export function applyTheme() {
    const tg = window.Telegram?.WebApp;
    if (tg?.colorScheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}