import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';

export function render(user) {
  const div = document.createElement('div');
  div.className = 'profile';
  
  div.appendChild(PageTitle('Профиль'));
  div.appendChild(Header(null));
  
  return div;
}
