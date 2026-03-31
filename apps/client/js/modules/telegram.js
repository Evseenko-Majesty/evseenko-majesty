const tg = window.Telegram?.WebApp || {
    expand: () => {},
    ready: () => {},
    close: () => {},
    colorScheme: localStorage.getItem('dev_theme') === 'dark' ? 'dark' : 'light',
    onEvent: () => {},
    HapticFeedback: {
        impactOccurred: () => {},
        notificationOccurred: () => {}
    },
    initDataUnsafe: {
        user: {
            id: 123456789,
            first_name: 'Тестовый',
            username: 'test_user',
            language_code: localStorage.getItem('dev_lang') || 'ru'
        }
    }
};

export const getTelegram = () => tg;

export const getUser = () => tg.initDataUnsafe?.user || null;

export const getTheme = () => tg.colorScheme || 'light';

export const haptic = (style = 'light') => {
    if (!tg.HapticFeedback) return;
    const styles = {
        light: () => tg.HapticFeedback.impactOccurred('light'),
        medium: () => tg.HapticFeedback.impactOccurred('medium'),
        heavy: () => tg.HapticFeedback.impactOccurred('heavy'),
        success: () => tg.HapticFeedback.notificationOccurred('success'),
        error: () => tg.HapticFeedback.notificationOccurred('error')
    };
    styles[style]?.();
};

export const expand = () => {
    try { tg.expand(); } catch(e) {}
};

export const ready = () => tg.ready();
