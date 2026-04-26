const API_URL = 'https://evseenko-api.onrender.com';

export const API = {

  async auth(telegramUser) {
    try {
      const res = await fetch(`${API_URL}/api/auth`, {
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
      return await res.json();
    } catch (error) {
      return { success: false, error: 'Сетевая ошибка' };
    }
  },

  async searchUsers(query) {
    try {
      const res = await fetch(`${API_URL}/api/users/search?query=${encodeURIComponent(query)}`);
      return await res.json();
    } catch (error) {
      return { success: false, users: [] };
    }
  },

  async checkPermission(userId, permission) {
    try {
      const res = await fetch(`${API_URL}/api/permissions/check?user_id=${userId}&permission=${permission}`);
      return await res.json();
    } catch (error) {
      return { success: false, hasAccess: false };
    }
  },

  async checkPermissions(userId, type) {
    try {
      const res = await fetch(`${API_URL}/api/permissions/check-type?user_id=${userId}&type=${type}`);
      return await res.json();
    } catch (error) {
      return { success: false, permissions: [] };
    }
  },

  async updateUserRole(userId, role, grantedBy) {
    try {
      const res = await fetch(`${API_URL}/api/permissions/role`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Granted-By': String(grantedBy)
        },
        body: JSON.stringify({ user_id: userId, role })
      });
      return await res.json();
    } catch (error) {
      return { success: false, error: 'Сетевая ошибка' };
    }
  }

};
