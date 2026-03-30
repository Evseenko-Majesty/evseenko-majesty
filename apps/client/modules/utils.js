// Общие утилиты
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const vibrate = (style = 'light') => {
    const tg = window.Telegram.WebApp;
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

export const expandWebApp = () => {
    try { window.Telegram.WebApp.expand(); } catch(e) {}
};
