// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// Собирает шапку и контент главной страницы
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { UserInfo } from '/shared/components/UserInfo.js';

export function render(user) {
  
  // Главный контейнер страницы
  const div = document.createElement('div');
  div.className = 'home';
  
  // ---------- ШАПКА ----------
  const header = document.createElement('div');
  header.className = 'home__header';
  
  // Логотип слева
  const logo = Logo();
  logo.classList.add('page-logo');
  logo.style.position = 'static';    // Убираем fixed, теперь он в потоке шапки
  header.appendChild(logo);
  
  // Профиль справа (данные пользователя в стиле шапки)
  const userInfo = UserInfo(user);
  userInfo.classList.add('user-info--header');  // ← Применяем размеры для шапки
  header.appendChild(userInfo);
  
  div.appendChild(header);
  
  // ---------- ОСТАЛЬНОЙ КОНТЕНТ (ПОКА ПУСТО) ----------
  // Здесь будут: приветствие, карточки услуг, история заказов
  
  return div;
}
