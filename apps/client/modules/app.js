// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================
import { renderSplash } from './screens/splash.js';
import { renderHome } from './screens/home.js';
import { authorize } from '/shared/js/auth.js';   // ← общая авторизация

// ============================================
// Функция обновления интерфейса
// ============================================
function updateUI(screen = 'splash', statusMessage = null) {
    const appContainer = document.getElementById('app');
    
    if (screen === 'splash') {
        appContainer.innerHTML = renderSplash(statusMessage);
    } else if (screen === 'home') {
        appContainer.innerHTML = renderHome();
    }
}

// ============================================
// ЗАПУСК
// ============================================
async function start() {
    // Показываем загрузочный экран
    updateUI('splash', 'Проверка сервера...');
    
    // Ждём 3 секунды
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Пытаемся авторизоваться
    updateUI('splash', 'Авторизация...');
    const result = await authorize();
    
    if (result.success) {
        updateUI('home');
    } else {
        updateUI('splash', `❌ Ошибка: ${result.error}\nПовторите позже`);
        // Можно добавить кнопку "Повторить"
    }
}

start();
