import { haptic } from './telegram.js';

export const goToScreen = (screenId) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenId}`)?.classList.add('active');
};

export const initNavigation = () => {
    const items = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.nav-indicator');

    if (indicator) {
        const activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
        if (activeIndex !== -1) indicator.style.left = `${activeIndex * 50}%`;
    }

    items.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            haptic('light');
            goToScreen(btn.dataset.screen);
            document.querySelector('.nav-item.active')?.classList.remove('active');
            btn.classList.add('active');
            if (indicator) indicator.style.left = `${index * 50}%`;
        });
    });
};
