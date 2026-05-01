// ============================================
// ГЛАВНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'home page-with-header';
  
  // Шапка (пока без правого контента)
  div.appendChild(Header(null));
  
  return div;
}
