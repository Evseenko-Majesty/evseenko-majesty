export function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenId}`)?.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-item[data-screen="${screenId}"]`)?.classList.add('active');
}

export function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            goToScreen(btn.dataset.screen);
        });
    });
}
