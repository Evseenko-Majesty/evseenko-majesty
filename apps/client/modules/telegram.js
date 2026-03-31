const tg = window.Telegram.WebApp;

export const getTelegramUser = () => tg.initDataUnsafe?.user || null;

export const getTelegramTheme = () => tg.colorScheme || 'light';

export const expand = () => {
    try { tg.expand(); } catch(e) {}
};

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

export const ready = () => tg.ready();
