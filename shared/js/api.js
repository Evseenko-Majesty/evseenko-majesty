// ============================================
// API — ЗАПРОСЫ К СЕРВЕРУ
// ============================================

const API_URL = 'https://evseenko-api.onrender.com';

export const API = {
  
  async auth(telegramUser) {
    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: telegramUser.id,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          username: telegramUser.username,
          photo_url: telegramUser.photo_url
        })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Сетевая ошибка' };
    }
  },

  async searchUsers(query) {
    try {
      const response = await fetch(`${API_URL}/api/users/search?query=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      return { success: false, users: [], error: 'Сетевая ошибка' };
    }
  },

  async updateUserRole(userId, role, grantedBy) {
    try {
      const response = await fetch(`${API_URL}/api/permissions/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Granted-By': String(grantedBy)
        },
        body: JSON.stringify({ user_id: userId, role })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Сетевая ошибка' };
    }
  }
};
