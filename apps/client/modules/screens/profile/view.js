import { Header } from '/shared/components/Header.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'profile';
  div.appendChild(Header(null));
  return div;
}
