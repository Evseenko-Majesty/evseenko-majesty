// ============================================
// УПРАВЛЕНИЕ ТЕМОЙ + РАСКРЫТИЕ НА ВЕСЬ ЭКРАН
// ============================================

import { getTelegram, expandApp, ready } from './telegram.js';

// Получить текущую тему из Telegram
function getTelegramTheme() {
    const tg = getTelegram();
    return tg?.colorScheme || 'light';
}

// Применить тему к странице
export function applyTheme() {
    const theme = getTelegramTheme();
    
    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Инициализация: раскрытие + тема
export function initTelegram() {
    // Раскрываем на весь экран
    expandApp();
    ready();
    
    // Применяем тему
    applyTheme();
    
    // Слушаем изменение темы
    const tg = getTelegram();
    if (tg) {
        tg.onEvent('themeChanged', applyTheme);
    }
}
