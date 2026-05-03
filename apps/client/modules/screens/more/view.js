import { Header } from '/shared/components/Header.js';
import { MenuItem } from '/shared/components/MenuItem.js';

export function render(onNavigate) {
  const div = document.createElement('div');
  div.className = 'more';
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'more__content';  // Отступ в more.css
  
  const profileIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-1c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1"/><circle cx="12" cy="7" r="4"/></svg>';
  
  content.appendChild(MenuItem('Профиль', profileIcon, () => onNavigate('profile')));
  div.appendChild(content);
  
  return div;
}
