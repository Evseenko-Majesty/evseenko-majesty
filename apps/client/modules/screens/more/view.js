// ============================================
// СТРАНИЦА "ЕЩЁ" — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'more';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';      // ← Общий класс
  
  const title = document.createElement('h1');
  title.className = 'page-title';          // ← Общий класс
  title.textContent = 'Ещё';
  
  content.appendChild(title);
  div.appendChild(content);
  
  return div;
}
