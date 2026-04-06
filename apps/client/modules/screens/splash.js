// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН
// ============================================
export function renderSplash(statusMessage = 'Проверка сервера...') {
    return `
        <div class="container" style="text-align: center; margin-top: 40vh;">
            <div class="logo">👑</div>
            <h1>EVSEENKO MAJESTY</h1>
            <div id="splashStatus" style="margin-top: 40px; font-size: 14px; opacity: 0.7;">${statusMessage}</div>
        </div>
    `;
}
