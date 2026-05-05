import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'city-select';
  
  div.appendChild(PageTitle('Выбор города'));
  div.appendChild(Header(null));
  
  return div;
}
