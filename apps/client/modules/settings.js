import { setTheme, getActiveTheme } from '/shared/js/theme.js';

export function initSettings(user) {
    if (user) {
        document.getElementById('userName').innerText = user.first_name || '—';
        document.getElementById('userLastName').innerText = user.last_name || '—';
        document.getElementById('userUsername').innerText = user.username || '—';
        document.getElementById('userLanguage').innerText = user.language_code || '—';
    }
    
    const currentTheme = getActiveTheme();
    document.querySelectorAll('[data-theme]').forEach(btn => {
        if (btn.dataset.theme === currentTheme) btn.classList.add('active');
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
            document.querySelectorAll('[data-theme]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}
