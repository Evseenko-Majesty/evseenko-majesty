// ============================================
// API — ЗАПРОСЫ К СЕРВЕРУ
// Все обращения к бэкенду собраны здесь
// ============================================

// Адрес сервера на Render (замени на свой когда задеплоишь)
const API_URL = 'https://evseenko-majesty-server.onrender.com';

export const API = {
  
  // Авторизация пользователя
  // Отправляет данные из Telegram, получает пользователя из базы
  async auth(telegramUser) {
    
    try {
      // Отправляем POST запрос на сервер
      const response = await fetch(`${API_URL}/api/auth`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'   // Отправляем JSON
        },
        body: JSON.stringify({
          telegram_id: telegramUser.id,        // ID в Telegram
          first_name: telegramUser.first_name, // Имя
          last_name: telegramUser.last_name,   // Фамилия (может не быть)
          username: telegramUser.username,     // @username
          photo_url: telegramUser.photo_url    // Ссылка на аватар
        })
      });
      
      // Ждём ответ от сервера и превращаем в объект
      const data = await response.json();
      return data;
      
    } catch (error) {
      // Если сервер недоступен — возвращаем ошибку
      console.error('Ошибка API:', error);
      return { 
        success: false, 
        error: 'Сетевая ошибка' 
      };
    }
  }
};
