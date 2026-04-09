// Загрузочный экран (только HTML)
import { renderLogo } from '/shared/components/Logo.js';

export function renderSplash() {
    return `
        <div class="splash-container">
            ${renderLogo()}
        </div>
    `;
}