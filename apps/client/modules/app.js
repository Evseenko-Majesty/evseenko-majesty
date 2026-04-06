// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

// Импортируем экраны
import { renderSplash } from './screens/splash.js';
import { renderHome } from './screens/home.js';   // ← добавляем главную

// ============================================
// Функция обновления интерфейса
// ============================================
function updateUI(screen = 'splash') {
    const appContainer = document.getElementById('app');
    
    if (screen === 'splash') {
        appContainer.innerHTML = renderSplash();
    } else if (screen === 'home') {
        appContainer.innerHTML = renderHome();
    }
}

// ============================================
// ЗАПУСК ПРИЛОЖЕНИЯ
// ============================================
// Сначала показываем загрузочный экран
updateUI('splash');

// Через 3 секунды переключаем на главную
setTimeout(() => {
    updateUI('home');
}, 3000);
