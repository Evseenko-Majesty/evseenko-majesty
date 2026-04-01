let tg = null;

export const initTelegram = () => {
    if (window.Telegram?.WebApp) {
        tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();
    } else {
        // Режим разработки (для ПК)
        console.warn('⚠️ Telegram WebApp не загружен, использую заглушку');
        tg = {
            expand: () => {},
            ready: () => {},
            close: () => {},
            colorScheme: 'light',
            onEvent: () => {},
            HapticFeedback: { impactOccurred: () => {}, notificationOccurred: () => {} },
            initDataUnsafe: { user: { id: 123456789, first_name: 'Тест', language_code: 'ru' } }
        };
    }
    return tg;
};

export const getTelegram = () => tg;

export const getUser = () => tg?.initDataUnsafe?.user || null;

export const getTheme = () => tg?.colorScheme || 'light';

export const haptic = (style = 'light') => {
    if (!tg?.HapticFeedback) return;
    const types = { light: 'light', medium: 'medium', heavy: 'heavy', success: 'success', error: 'error' };
    if (style === 'success') tg.HapticFeedback.notificationOccurred('success');
    else if (style === 'error') tg.HapticFeedback.notificationOccurred('error');
    else tg.HapticFeedback.impactOccurred(types[style] || 'light');
};

export const expand = () => tg?.expand();
export const close = () => tg?.close();
