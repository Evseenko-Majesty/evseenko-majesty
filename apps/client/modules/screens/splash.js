// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН (splash)
// ============================================
// Этот файл отвечает только за отображение загрузочного экрана
// ============================================

// Функция, которая возвращает HTML код загрузочного экрана
export function renderSplash() {
    return `
        <div style="text-align: center; margin-top: 40vh;">
            <div style="font-size: 80px;">👑</div>
            <div style="font-size: 24px; letter-spacing: 4px;">EVSEENKO MAJESTY</div>
        </div>
    `;
}
