// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН (только HTML)
// ============================================

import { renderLogo } from '/shared/components/Logo.js';
import './splash.css';

export function renderSplash() {
    return `
        <div class="splash-container">
            ${renderLogo()}
        </div>
    `;
}
