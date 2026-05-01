// ============================================
// СТРАНИЦА "МЕДИА"
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'media';
  
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Медиа';
  
  content.appendChild(title);
  div.appendChild(content);
  
  return div;
}
