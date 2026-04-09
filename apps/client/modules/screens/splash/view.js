// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН (HTML и анимация)
// ============================================

import './splash.css';

export function renderSplash() {
    return `
        <div class="splash-container">
            <div class="splash-logo">👑</div>
        </div>
    `;
}

export function animateSplash() {
    const logo = document.querySelector('.splash-logo');
    if (logo) {
        setTimeout(() => {
            logo.classList.add('active');
        }, 100);
    }
}