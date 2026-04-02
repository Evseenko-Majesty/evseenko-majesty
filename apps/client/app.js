// apps/client/app.js — минимальная версия
console.log('✅ app.js загружен');

const splash = document.getElementById('splash');
const main = document.getElementById('main');
const statusEl = document.getElementById('splashStatus');

if (splash && main && statusEl) {
    statusEl.textContent = 'тестовый режим';
    
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'block';
        }, 500);
    }, 2000);
} else {
    console.error('❌ Элементы не найдены');
}
