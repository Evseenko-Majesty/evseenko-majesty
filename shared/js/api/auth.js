import { API_URL } from './config.js';  // Адрес сервера

// Методы для авторизации
export const AuthAPI = {
  
  // Вход/регистрация через Telegram
  async login(telegramUser) {
    try {
      // Отправляем POST запрос на сервер
      const res = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },  // Отправляем JSON
        body: JSON.stringify({
          telegram_id: telegramUser.id,      // ID в Telegram
          first_name: telegramUser.first_name,  // Имя
          last_name: telegramUser.last_name,    // Фамилия
          username: telegramUser.username,      // @username
          photo_url: telegramUser.photo_url     // Ссылка на аватар
        })
      });
      return await res.json();  // Ответ сервера
    } catch (e) {
      return { success: false, error: 'Сетевая ошибка' };
    }
  }
};
