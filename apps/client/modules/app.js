// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { renderSplash } from 'apps/client/modules/screens/splash/view.js';
import { animateSplash } from 'apps/client/modules/screens/splash/controller.js';
import { initTelegram } from '/shared/js/theme.js';
import { initTelegram } from '/shared/js/telegram.js';
import { initTelegram } from '/shared/js/auth.js';
// Инициализация Telegram (раскрытие + тема)
initTelegram();

function updateUI() {
    const app = document.getElementById('app');
    app.innerHTML = renderSplash();
    animateSplash();
}

updateUI();
