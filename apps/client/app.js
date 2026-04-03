import { initTelegram, getUser, applyTheme } from '/shared/js/telegram.js';
import { getBalance } from '/shared/js/api.js';

initTelegram();
applyTheme();

const user = getUser();
if (user) {
    document.getElementById('userName').innerText = user.first_name || '—';
    document.getElementById('userId').innerText = user.id || '—';
    
    getBalance(user.id).then(data => {
        document.getElementById('balance').innerText = data.balance || 0;
        document.getElementById('bonus').innerText = data.bonus || 0;
    });
}

// Навигация
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const screenId = btn.dataset.screen;
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screenId}`).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
