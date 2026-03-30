const tg = window.Telegram.WebApp;

let currentLang = localStorage.getItem('app_lang') || detectLanguage();

export function detectLanguage() {
    const tgLang = tg.initDataUnsafe?.user?.language_code || 'en';
    return tgLang === 'ru' ? 'ru' : 'en';
}

export function getCurrentLanguage() {
    return currentLang;
}

export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
}

export function updateLanguageTexts() {
    const texts = {
        ru: {
            home: 'Главная',
            settings: 'Настройки',
            language: '🌐 Язык / Language',
            taglinePrimary: 'Двигайся за пределами',
            taglineSecondary: 'Drive Beyond Limits',
            status: 'СИСТЕМА ГОТОВА',
            copyrightLine1: 'Evseenko Majesty © 2026',
            copyrightLine2: 'Все права защищены'
        },
        en: {
            home: 'Home',
            settings: 'Settings',
            language: '🌐 Language / Язык',
            taglinePrimary: 'Drive Beyond Limits',
            taglineSecondary: 'Двигайся за пределами',
            status: 'SYSTEM READY',
            copyrightLine1: 'Evseenko Majesty © 2026',
            copyrightLine2: 'All Rights Reserved'
        }
    };

    const t = texts[currentLang];

    const homeH1 = document.querySelector('#screen-home h1');
    const settingsH1 = document.querySelector('#screen-settings h1');
    if (homeH1) homeH1.innerText = t.home;
    if (settingsH1) settingsH1.innerText = t.settings;

    const settingSpans = document.querySelectorAll('.setting-item span');
    if (settingSpans.length >= 3) {
        settingSpans[2].innerText = t.language;
    }

    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length >= 2) {
        navItems[0].querySelector('span').innerText = t.home;
        navItems[1].querySelector('span').innerText = t.settings;
    }

    const copyrightDiv = document.getElementById('splashCopyright');
    if (copyrightDiv) {
        copyrightDiv.innerHTML = `<div>${t.copyrightLine1}</div><div>${t.copyrightLine2}</div>`;
    }

    const taglinePrimary = document.getElementById('taglinePrimary');
    const taglineSecondary = document.getElementById('taglineSecondary');
    if (taglinePrimary) taglinePrimary.innerText = t.taglinePrimary;
    if (taglineSecondary) taglineSecondary.innerText = t.taglineSecondary;

    const statusEl = document.getElementById('splashStatus');
    if (statusEl) statusEl.innerText = t.status;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLang) btn.classList.add('active');
    });
}
