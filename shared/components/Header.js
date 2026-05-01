// ============================================
// ШАПКА — ОБЩИЙ КОМПОНЕНТ
// Логотип слева, правый контент можно передать
// ============================================

import { Logo } from './Logo.js';

export function Header(rightContent = null) {
  const header = document.createElement('header');
  header.className = 'app-header';
  
  // Логотип слева
  const logo = Logo();
  logo.classList.add('app-header__logo');
  header.appendChild(logo);
  
  // Правый контент (если передан)
  if (rightContent) {
    const right = document.createElement('div');
    right.className = 'app-header__right';
    right.appendChild(rightContent);
    header.appendChild(right);
  }
  
  return header;
}
