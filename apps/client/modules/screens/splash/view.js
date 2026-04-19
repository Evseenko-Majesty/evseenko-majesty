// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const logo = Logo();
  div.appendChild(logo);
  
  return div;
}
