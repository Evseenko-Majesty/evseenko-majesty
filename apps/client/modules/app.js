// ============================================
// УПРОЩЁННАЯ ВЕРСИЯ ДЛЯ ПРОВЕРКИ
// ============================================

console.log('✅ app.js загружен');

document.getElementById('app').innerHTML = `
    <div style="text-align: center; margin-top: 40vh;">
        <div style="font-size: 80px;">👑</div>
        <div style="font-size: 24px;">EVSEENKO MAJESTY</div>
    </div>
`;

// Telegram раскрытие (если есть)
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand();
    tg.ready();
    console.log('✅ Telegram раскрыт');
}