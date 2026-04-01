import { getTexts, getCurrentLanguage } from '../js/language.js';

export class SplashScreen {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            title: 'EVSEENKO MAJESTY',
            subtitle: '',
            logo: '👑',
            onComplete: () => {},
            ...options
        };
        this.isVisible = true;
        this.init();
    }
    
    init() {
        this.render();
        this.updateTexts();
        
        // Слушаем смену языка
        window.addEventListener('languageChanged', () => this.updateTexts());
    }
    
    render() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="splash-content">
                <div class="splash-logo">${this.options.logo}</div>
                <div class="splash-title">${this.options.title}</div>
                <div class="splash-subtitle" id="splashSubtitle">${this.options.subtitle}</div>
                <div class="splash-status" id="splashStatus">${getTexts()[getCurrentLanguage()].loading}</div>
                <div class="splash-copyright">Evseenko Majesty © 2026</div>
            </div>
        `;
        this.container.classList.add('splash');
    }
    
    updateTexts() {
        const statusEl = document.getElementById('splashStatus');
        if (statusEl) {
            statusEl.textContent = getTexts()[getCurrentLanguage()].loading;
        }
        const subtitleEl = document.getElementById('splashSubtitle');
        if (subtitleEl && this.options.subtitle) {
            subtitleEl.textContent = this.options.subtitle;
        }
    }
    
    setStatus(status) {
        const statusEl = document.getElementById('splashStatus');
        if (statusEl) statusEl.textContent = status;
    }
    
    hide() {
        if (!this.container) return;
        this.container.style.opacity = '0';
        setTimeout(() => {
            this.container.style.display = 'none';
            this.isVisible = false;
            this.options.onComplete();
        }, 400);
    }
    
    showError(message) {
        this.setStatus(message);
        setTimeout(() => {
            this.setStatus(getTexts()[getCurrentLanguage()].retry);
        }, 2000);
    }
}
