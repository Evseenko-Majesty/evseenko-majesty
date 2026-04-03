// Было: const API_URL = 'https://evseenko-api.onrender.com';
// Стало:
const API_URL = '';  // пустая строка — запросы пойдут через прокси

export async function getBalance(telegramId) {
    try {
        const res = await fetch(`/api/user/${telegramId}`);
        return await res.json();
    } catch {
        return { balance: 0, bonus: 0 };
    }
}
