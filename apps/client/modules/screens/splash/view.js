// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// Собирает все компоненты вместе и возвращает HTML
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';
import { Slogan } from '/shared/components/Slogan.js';
import { Copyright } from '/shared/components/Copyright.js';
import { StatusCard } from '/shared/components/StatusCard.js';

export function render() {
  
  // 1. Главный контейнер экрана
  const div = document.createElement('div');
  div.className = 'splash';  // Стили из splash.css
  
  // 2. Добавляем логотип (корона)
  div.appendChild(Logo());
  
  // 3. Добавляем название бренда
  div.appendChild(BrandName());
  
  // 4. Добавляем слоган (две строки)
  div.appendChild(Slogan());
  
  // 5. Добавляем копирайт (внизу)
  div.appendChild(Copyright());
  
  // 6. Создаём статус-карточку и получаем ссылки на её части
  const { div: statusDiv, indicator, text } = StatusCard();
  div.appendChild(statusDiv);
  
  // 7. Возвращаем всё вместе:
  //    - div: чтобы добавить на страницу
  //    - statusCard, statusText, statusIndicator: чтобы управлять из контроллера
  return { 
    div, 
    statusCard: statusDiv, 
    statusText: text, 
    statusIndicator: indicator 
  };
}
