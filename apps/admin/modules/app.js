// ============================================
// EMajesty Core — ГЛАВНЫЙ ФАЙЛ АДМИН-ПАНЕЛИ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';

const tg = initTelegram();
const container = document.getElementById('app');

// Пока пустая проверка
container.innerHTML = '<h1 style="color: var(--text-color); padding: 20vh 5%;">EMajesty Core</h1>';
