// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЧТО ВИДИТ ПОЛЬЗОВАТЕЛЬ
// ============================================

import { Logo } from '/shared/components/Logo.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  // Добавляем логотип
  div.appendChild(Logo());
  
  return div;
}
