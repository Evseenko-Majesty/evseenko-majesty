// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Copyright } from '/shared/components/Copyright.js';

export function render() {
  const div = document.createElement('div');
  
  // Добавляем копирайт
  const copyright = Copyright();
  div.appendChild(copyright);
  
  return div;
}
