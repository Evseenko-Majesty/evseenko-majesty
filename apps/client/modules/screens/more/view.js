// ============================================
// СТРАНИЦА "ЕЩЁ" — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Header } from '/shared/components/Header.js';
import { LINKS } from '/shared/constants/links.js';

export function render(user, onNavigate) {
  const div = document.createElement('div');
  div.className = 'more';
  
  const header = Header(null);
  div.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'page-content';
  
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Ещё';
  
  // Профиль
  const profileItem = document.createElement('div');
  profileItem.className = 'menu-item';
  profileItem.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1"/>
        <path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z"/>
      </svg>
    </span>
    <span>Профиль</span>
    <span class="menu-item__arrow">›</span>
  `;
  profileItem.addEventListener('click', () => onNavigate('profile'));
  
  // Telegram
  const telegramItem = document.createElement('div');
  telegramItem.className = 'menu-item menu-item--telegram';
  telegramItem.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 3L3 10l5 3l2 6l3 -5l5 2z"/>
        <path d="M10 13l5 4v-8l-9 3"/>
      </svg>
    </span>
    <span>Наша группа Telegram</span>
    <span class="menu-item__arrow">›</span>
  `;
  telegramItem.addEventListener('click', () => {
    window.open(LINKS.telegram, '_blank');
  });
  
  // VK
  const vkItem = document.createElement('div');
  vkItem.className = 'menu-item menu-item--vk';
  vkItem.innerHTML = `
    <span class="menu-item__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10 -4.48 10 -10S17.52 2 12 2z"/>
        <path d="M8 8h1c1 0 2 0.5 2.5 1.5l0.5 1l1 -2c0.3 -0.5 1 -0.5 1.5 -0.5h0.5"/>
        <path d="M8 12h2l1 3l1 -2l1 2l1 -3h2"/>
      </svg>
    </span>
    <span>Наша группа VK</span>
    <span class="menu-item__arrow">›</span>
  `;
  vkItem.addEventListener('click', () => {
    window.open(LINKS.vk, '_blank');
  });
  
  content.appendChild(title);
  content.appendChild(profileItem);
  content.appendChild(telegramItem);
  content.appendChild(vkItem);
  div.appendChild(content);
  
  return div;
}
