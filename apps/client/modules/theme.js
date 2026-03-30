import { vibrate } from './utils.js';

const tg = window.Telegram.WebApp;

export function applyTheme() {
    const theme = tg.colorScheme;
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

export function initTheme() {
    applyTheme();
    tg.onEvent('themeChanged', applyTheme);
}
