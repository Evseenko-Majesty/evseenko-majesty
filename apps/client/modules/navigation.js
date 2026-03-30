import { vibrate } from './utils.js';

export function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add('active');
}

export function initNavigation() {
    const items = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.nav-indicator');

    if (indicator) {
        const activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
        if (activeIndex !== -1) {
            indicator.style.left = `${activeIndex * 50}%`;
        }
    }

    items.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            vibrate('light');
            goToScreen(btn.dataset.screen);
            document.querySelector('.nav-item.active')?.classList.remove('active');
            btn.classList.add('active');
            if (indicator) {
                indicator.style.left = `${index * 50}%`;
            }
        });
    });
}
