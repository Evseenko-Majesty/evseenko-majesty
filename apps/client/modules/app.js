import { initTelegram } from '/shared/js/telegram.js';

const tg = initTelegram();
const container = document.getElementById('app');

// Тест — просто текст
container.innerHTML = '<h1 style="color: gold; text-align: center; padding-top: 30vh;">Работает</h1>';
