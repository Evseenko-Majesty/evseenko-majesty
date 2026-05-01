// ============================================
// API — АВТОРИЗАЦИЯ
// ============================================

import { API_URL } from './index.js';

export const AuthAPI = {
  // Вход/регистрация через Telegram
  async login(telegramUser) {
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
  }
};
