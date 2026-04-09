// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { renderSplash } from './screens/splash/view.js';
import { animateSplash } from './screens/splash/controller.js';
import { initTelegram } from '/shared/js/theme.js';

// Инициализация Telegram (раскрытие + тема)
initTelegram();

function updateUI() {
    const app = document.getElementById('app');
    app.innerHTML = renderSplash();
    animateSplash();
}

updateUI();
