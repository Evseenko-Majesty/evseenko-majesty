// ============================================
// ОБЩАЯ АВТОРИЗАЦИЯ (для всех приложений)
// ============================================
const API_URL = 'https://evseenko-server.onrender.com';  // Замени на свой URL

// ============================================
// Получить данные пользователя из Telegram
// ============================================
export function getTelegramUser() {
    const tg = window.Telegram?.WebApp;
    return tg?.initDataUnsafe?.user || null;
}

// ============================================
// Авторизация (регистрация/вход)
// ============================================
export async function authorize() {
    const user = getTelegramUser();
    
    if (!user) {
        return { success: false, error: 'No Telegram data' };
    }
    
    try {
        const response = await fetch(`${API_URL}/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telegram_id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                language_code: user.language_code,
                photo_url: user.photo_url
            })
        });
        
        return await response.json();
        
    } catch (error) {
        return { success: false, error: error.message };
    }
}
