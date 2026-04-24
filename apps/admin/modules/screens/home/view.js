// ============================================
// ГЛАВНАЯ АДМИН-ПАНЕЛИ — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'home';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'EMajesty Core';
  
  content.appendChild(title);
  div.appendChild(content);
  
  return div;
}
