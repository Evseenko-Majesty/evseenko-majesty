import { getTheme } from './telegram.js';

let currentTheme = localStorage.getItem('theme') || 'auto';

export function getActiveTheme() {
    if (currentTheme === 'light') return 'light';
    if (currentTheme === 'dark') return 'dark';
    return getTheme() === 'dark' ? 'dark' : 'light';
}

export function applyTheme() {
    const theme = getActiveTheme();
    document.body.classList.remove('light', 'dark', 'afterdark');
    document.body.classList.add(theme);
}

export function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
}

export function initTheme() {
    applyTheme();
    window.Telegram?.WebApp?.onEvent('themeChanged', () => {
        if (currentTheme === 'auto') applyTheme();
    });
}
