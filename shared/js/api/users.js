// ============================================
// API — ПОЛЬЗОВАТЕЛИ
// ============================================

import { API_URL } from './config.js';

export const UsersAPI = {
  
  async updateCity(telegramId, cityId) {
    try {
      const r = await fetch(`${API_URL}/api/users/city`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: telegramId, city_id: cityId })
      });
      return await r.json();
    } catch { return { success: false }; }
  }

};
