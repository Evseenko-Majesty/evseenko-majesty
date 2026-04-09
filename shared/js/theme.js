// ============================================
// УПРАВЛЕНИЕ ТЕМОЙ (светлая / тёмная)
// ============================================

// Получить текущую тему из Telegram
function getTelegramTheme() {
    const tg = window.Telegram?.WebApp;
    return tg?.colorScheme || 'light';   // 'light' или 'dark'
}

// Применить тему к странице
export function applyTheme() {
    const theme = getTelegramTheme();
    
    if (theme === 'dark') {
        document.body.classList.add('dark');   // добавляем класс dark
    } else {
        document.body.classList.remove('dark'); // убираем класс dark
    }
}

// Слушать изменение темы в Telegram
export function initTheme() {
    // Применяем тему сразу
    applyTheme();
    
    // Слушаем событие смены темы
    const tg = window.Telegram?.WebApp;
    if (tg) {
        tg.onEvent('themeChanged', applyTheme);
    }
}
