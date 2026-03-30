import { vibrate } from './utils.js';

export function startSplash(onComplete) {
    const splash = document.getElementById('splash');
    const main = document.getElementById('main');
    const logoWrapper = document.querySelector('.splash-logo-wrapper');
    const brand = document.querySelector('.splash-brand');
    const tagline = document.querySelector('.splash-tagline');
    const statusWrapper = document.querySelector('.splash-status-wrapper');

    setTimeout(() => { if (logoWrapper) logoWrapper.classList.add('active'); }, 200);
    setTimeout(() => { if (brand) brand.classList.add('active'); }, 600);
    setTimeout(() => { if (tagline) tagline.classList.add('active'); }, 1000);
    setTimeout(() => { 
        if (statusWrapper) statusWrapper.classList.add('active');
        vibrate('medium');
    }, 1400);

    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'block';
            if (onComplete) onComplete();
        }, 400);
    }, 5000);
}
