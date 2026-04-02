import { checkServer } from '/shared/js/api.js';
import { sleep } from '/shared/js/utils.js';

export async function showSplash(onComplete) {
    const splash = document.getElementById('splash');
    const statusEl = document.getElementById('splashStatus');
    const philosophyEl = document.getElementById('splashPhilosophy');
    
    // Анимация появления
    setTimeout(() => {
        philosophyEl.style.opacity = '1';
    }, 200);
    
    let serverReady = false;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!serverReady && attempts < maxAttempts) {
        attempts++;
        statusEl.textContent = `сервер: попытка ${attempts}/${maxAttempts}`;
        serverReady = await checkServer();
        if (!serverReady) await sleep(2000);
    }
    
    if (serverReady) {
        statusEl.textContent = 'сервер готов';
        await sleep(1500);
    } else {
        statusEl.textContent = 'нет связи с сервером';
        await sleep(2000);
        return;
    }
    
    splash.style.opacity = '0';
    setTimeout(() => {
        splash.style.display = 'none';
        if (onComplete) onComplete();
    }, 500);
}
