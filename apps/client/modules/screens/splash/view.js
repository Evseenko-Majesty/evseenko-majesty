import { renderLogo } from '/shared/components/Logo.js';
import './splash.css';

export function renderSplash() {
    return `
        <div class="splash-container">
            ${renderLogo()}
        </div>
    `;
}

export function animateSplash() {
    const logo = document.getElementById('logo');
    if (logo) logo.classList.add('active');
}
