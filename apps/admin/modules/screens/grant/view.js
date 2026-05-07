import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'grant';
  div.appendChild(Header(null));
  return div;
}
