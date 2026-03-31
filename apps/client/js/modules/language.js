import { getUser, haptic } from './telegram.js';

let currentLang = localStorage.getItem('app_lang') || detectLanguage();

export const detectLanguage = () => {
    const user = getUser();
    const tgLang = user?.language_code || 'en';
    return tgLang === 'ru' ? 'ru' : 'en';
};

export const getCurrentLanguage = () => currentLang;

export const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
    haptic('light');
};

export const getTranslations = () => ({
    ru: {
        home: 'Главная',
        settings: 'Настройки',
        language: '🌐 Язык / Language',
        taglinePrimary: 'Двигайся за пределами',
        taglineSecondary: 'Drive Beyond Limits',
        status: 'СИСТЕМА ГОТОВА',
        copyright1: 'Evseenko Majesty © 2026',
        copyright2: 'Все права защищены'
    },
    en: {
        home: 'Home',
        settings: 'Settings',
        language: '🌐 Language / Язык',
        taglinePrimary: 'Drive Beyond Limits',
        taglineSecondary: 'Двигайся за пределами',
        status: 'SYSTEM READY',
        copyright1: 'Evseenko Majesty © 2026',
        copyright2: 'All Rights Reserved'
    }
});

export const updateUI = () => {
    const t = getTranslations()[currentLang];
    
    document.querySelector('#screen-home h1').innerText = t.home;
    document.querySelector('#screen-settings h1').innerText = t.settings;
    
    const settingSpans = document.querySelectorAll('.setting-item span');
    if (settingSpans.length >= 3) settingSpans[2].innerText = t.language;
    
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length >= 2) {
        navItems[0].querySelector('span').innerText = t.home;
        navItems[1].querySelector('span').innerText = t.settings;
    }
    
    const copyrightDiv = document.getElementById('splashCopyright');
    if (copyrightDiv) {
        copyrightDiv.innerHTML = `<div>${t.copyright1}</div><div>${t.copyright2}</div>`;
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
};
