// ============================================
// СТРАНИЦА "ЕЩЁ"
// ============================================

import { Header } from '/shared/components/Header.js';
import { MenuItem } from '/shared/components/MenuItem.js';
import { LINKS } from '/shared/constants/links.js';

export function render(onNavigate) {
  const div = document.createElement('div');
  div.className = 'more';
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  const profileIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-1c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1"/><circle cx="12" cy="7" r="4"/></svg>';
  const telegramIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>';
  const vkIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.45-1.69-1.44-.88-.83-1.26-.95-1.47-.95-.29 0-.38.08-.38.5v1.31c0 .35-.11.57-1.04.57-1.54 0-3.25-.94-4.45-2.67-1.81-2.54-2.3-4.46-2.3-4.84 0-.21.07-.41.49-.41h1.47c.37 0 .51.16.65.56.72 2.1 1.92 3.9 2.41 3.9.19 0 .27-.09.27-.55V10.1c-.05-.98-.58-1.07-.58-1.42 0-.18.14-.34.37-.34h2.29c.31 0 .42.16.42.54v2.89c0 .31.13.42.23.42.18 0 .34-.11.67-.45 1.05-1.17 1.8-2.98 1.8-2.98.1-.21.26-.41.65-.41h1.43c.44 0 .54.23.44.54-.18.85-1.96 3.36-1.94 3.36-.16.25-.22.36 0 .65.15.21.66.65 1 1.04.62.71 1.1 1.3 1.23 1.71.11.41-.09.62-.51.62z"/></svg>';
  
  // Профиль
  content.appendChild(MenuItem('Профиль', profileIcon, () => onNavigate('profile')));
  
  // Группа соцсетей
  const group = document.createElement('div');
  group.className = 'menu-group';
  
  // Заголовок внутри группы
  const socialTitle = document.createElement('p');
  socialTitle.className = 'menu-social-title';
  socialTitle.textContent = 'Наши соцсети';
  group.appendChild(socialTitle);
  
  // Telegram
  const tgItem = MenuItem('Telegram', telegramIcon, () => window.open(LINKS.telegram, '_blank'));
  tgItem.classList.add('menu-item--telegram');
  group.appendChild(tgItem);
  
  // VK
  const vkItem = MenuItem('VK', vkIcon, () => window.open(LINKS.vk, '_blank'));
  vkItem.classList.add('menu-item--vk');
  group.appendChild(vkItem);
  
  content.appendChild(group);
  div.appendChild(content);
  
  return div;
}
