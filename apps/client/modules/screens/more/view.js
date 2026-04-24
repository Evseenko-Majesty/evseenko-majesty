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
  profileItem.textContent = 'Профиль';
  profileItem.addEventListener('click', () => onNavigate('profile'));
  
  // Наша группа Telegram
  const telegramItem = document.createElement('div');
  telegramItem.className = 'menu-item menu-item--telegram';
  telegramItem.textContent = 'Наша группа Telegram';
  telegramItem.addEventListener('click', () => {
    window.open(LINKS.telegram, '_blank');
  });
  
  // Наша группа VK
  const vkItem = document.createElement('div');
  vkItem.className = 'menu-item menu-item--vk';
  vkItem.textContent = 'Наша группа VK';
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
