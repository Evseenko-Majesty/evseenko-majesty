import { getTelegramTheme } from './telegram.js';

let currentTheme = localStorage.getItem('theme') || 'auto';

export const getActiveTheme = () => {
    if (currentTheme === 'light') return 'light';
    if (currentTheme === 'dark') return 'dark';
    const tgTheme = getTelegramTheme();
    return tgTheme === 'dark' ? 'dark' : 'light';
};

export const applyTheme = () => {
    const theme = getActiveTheme();
    document.body.classList.remove('dark');
    if (theme === 'dark') document.body.classList.add('dark');
};

export const setTheme = (theme) => {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    applyTheme();
};

export const initTheme = () => {
    applyTheme();
    window.Telegram.WebApp.onEvent('themeChanged', applyTheme);
};
