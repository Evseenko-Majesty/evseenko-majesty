const API_URL = 'https://evseenko-majesty.onrender.com';
let currentUser = null;

export async function authorize(telegramData) {
    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telegramData)
        });
        const data = await response.json();
        if (data.success) {
            currentUser = data.user;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Auth error:', error);
        return false;
    }
}

export function getCurrentUser() {
    return currentUser;
}

export function updateUI() {
    if (!currentUser) return;
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    if (userNameEl) userNameEl.innerText = currentUser.name;
    if (userRoleEl) {
        const roleMap = { client: 'Клиент', master: 'Мастер', admin: 'Администратор' };
        userRoleEl.innerText = roleMap[currentUser.role] || 'Владелец';
    }
}
