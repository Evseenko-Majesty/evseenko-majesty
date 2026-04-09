import { renderLogo } from '/shared/components/Logo.js';
э

export function renderSplash() {
    return `
        <div class="splash-container">
            ${renderLogo()}
        </div>
    `;
}
