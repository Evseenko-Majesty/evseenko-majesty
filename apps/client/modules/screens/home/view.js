// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Добавляем логотип в шапку
  const logo = Logo();
  logo.classList.add('header-logo');  // ← Класс для позиционирования в углу
  div.appendChild(logo);
  
  return div;
}
