// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Copyright } from '/shared/components/Copyright.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';  // Стили из splash.css
  
  const copyright = Copyright();
  div.appendChild(copyright);
  
  return div;
}
