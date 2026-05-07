import { Header } from '/shared/components/Header.js';
import { MenuItem } from '/shared/components/MenuItem.js';

export function render(onNavigate, showGrant) {
  const div = document.createElement('div');
  div.className = 'more';
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  const profileIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21v-1c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1"/><circle cx="12" cy="7" r="4"/></svg>';
  content.appendChild(MenuItem('Профиль', profileIcon, () => onNavigate('profile')));
  
  // Доступ — только если showGrant
  if (showGrant) {
    const grantIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11 5.17-.85 9-5.75 9-11V7l-12-5z"/><path d="M9 12l2 2 4-4"/></svg>';
    content.appendChild(MenuItem('Доступ', grantIcon, () => onNavigate('grant')));
  }
  
  div.appendChild(content);
  return div;
}
