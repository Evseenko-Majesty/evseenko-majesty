// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';

const tg = initTelegram();
const container = document.getElementById('app');

// Проверяем что тема работает
container.innerHTML = `
  <h1 style="color: var(--text-color); text-align: center; padding-top: 30vh;">
    Evseenko Majesty
  </h1>
`;
