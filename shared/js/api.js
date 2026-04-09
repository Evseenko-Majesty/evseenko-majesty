const API_URL = 'http://localhost:3001';

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
  }
};
