import { initTelegram, getUser, close } from '/shared/js/telegram.js';

// Инициализация Telegram
initTelegram();

const statusEl = document.getElementById('status');
const closeBtn = document.getElementById('closeBtn');

setTimeout(() => {
    const user = getUser();
    if (statusEl) {
        statusEl.innerHTML = `
            ✅ Система готова<br>
            <small>Добро пожаловать, ${user?.first_name || 'гость'}</small>
        `;
    }
    if (closeBtn) {
        closeBtn.style.display = 'inline-block';
        closeBtn.onclick = close;
    }
}, 1500);
