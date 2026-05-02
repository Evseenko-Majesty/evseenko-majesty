import { Header } from '/shared/components/Header.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Шапка (логотип слева, пока без правого контента)
  div.appendChild(Header(null));
  
  return div;
}
