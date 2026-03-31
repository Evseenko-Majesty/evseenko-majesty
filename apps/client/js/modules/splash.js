import { haptic } from './telegram.js';

export const startSplash = (onComplete) => {
    const splash = document.getElementById('splash');
    const main = document.getElementById('main');
    const logo = document.querySelector('.splash-logo-wrapper');
    const brand = document.querySelector('.splash-brand');
    const tagline = document.querySelector('.splash-tagline');
    const statusWrapper = document.querySelector('.splash-status-wrapper');

    setTimeout(() => logo?.classList.add('active'), 200);
    setTimeout(() => brand?.classList.add('active'), 600);
    setTimeout(() => tagline?.classList.add('active'), 1000);
    setTimeout(() => {
        statusWrapper?.classList.add('active');
        haptic('medium');
    }, 1400);

    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'block';
            onComplete?.();
        }, 400);
    }, 5000);
};
