// Telegram WebApp
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.expand();
            tg.ready();
        }

        // Данные пользователя
        const user = tg?.initDataUnsafe?.user;
        if (user) {
            document.getElementById('userName').innerText = user.first_name || '—';
            document.getElementById('userId').innerText = user.id || '—';
        }

        // === ЗАГРУЗКА БАЛАНСА С СЕРВЕРА ===
        const API_URL = 'https://evseenko-api.onrender.com'; // ЗАМЕНИ НА СВОЙ URL

        async function loadBalance() {
            if (!user) return;
            
            try {
                const response = await fetch(`${API_URL}/api/user/${user.id}`);
                const data = await response.json();
                
                document.getElementById('balance').innerText = data.balance || 0;
                document.getElementById('bonus').innerText = data.bonus || 0;
            } catch (error) {
                console.error('Ошибка загрузки баланса:', error);
            }
        }

        // Вызываем загрузку баланса
        loadBalance();

        // Переключение экранов
        document.getElementById('navHome').onclick = () => {
            document.getElementById('screen-home').classList.add('active');
            document.getElementById('screen-settings').classList.remove('active');
        };
        document.getElementById('navSettings').onclick = () => {
            document.getElementById('screen-settings').classList.add('active');
            document.getElementById('screen-home').classList.remove('active');
        };

        // Автотема (следит за Telegram)
function applyTheme() {
    const tg = window.Telegram?.WebApp;
    if (tg?.colorScheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}
applyTheme();
window.Telegram?.WebApp?.onEvent('themeChanged', applyTheme);
        // Пополнение баланса
const topupBtn = document.getElementById('topupBtn');
if (topupBtn) {
    topupBtn.onclick = () => {
        alert('Пополнение баланса скоро появится');
    };
}