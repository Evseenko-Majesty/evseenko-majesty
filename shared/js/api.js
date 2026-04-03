const API_URL = 'https://evseenko-api.onrender.com';

export async function getBalance(telegramId) {
    try {
        const res = await fetch(`${API_URL}/api/user/${telegramId}`);
        return await res.json();
    } catch {
        return { balance: 0, bonus: 0 };
    }
}