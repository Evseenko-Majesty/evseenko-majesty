const API_URL = 'https://evseenko-api.onrender.com';
let currentUser = null;

export const authorize = async (telegramData) => {
    try {
        const res = await fetch(`${API_URL}/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telegramData)
        });
        const data = await res.json();
        if (data.success) {
            currentUser = data.user;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Auth error:', error);
        return false;
    }
};

export const getUser = () => currentUser;

export const updateUserUI = () => {
    if (!currentUser) return;
    document.getElementById('userName').innerText = currentUser.name;
    const roleMap = { client: 'Клиент', master: 'Мастер', admin: 'Администратор' };
    document.getElementById('userRole').innerText = roleMap[currentUser.role] || 'Владелец';
};
