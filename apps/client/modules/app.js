// ============================================
// ГЛАВНЫЙ ФАЙЛ (запускает загрузочный экран)
// ============================================

import { renderSplash, animateSplash } from './screens/splash/view.js';

// Telegram раскрытие
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
}

function updateUI() {
    const app = document.getElementById('app');
    app.innerHTML = renderSplash();
    animateSplash();
}

updateUI();