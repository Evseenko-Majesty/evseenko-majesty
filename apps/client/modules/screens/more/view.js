import { Header } from '/shared/components/Header.js';

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
  
  const btn = document.createElement('button');
  btn.textContent = 'ПРОФИЛЬ';
  btn.style.padding = '20px';
  btn.style.margin = '20px';
  btn.style.fontSize = '20px';
  btn.addEventListener('click', () => {
    console.log('🖱️ Клик по ПРОФИЛЬ');
    onNavigate('profile');
  });
  
  content.appendChild(title);
  content.appendChild(btn);
  div.appendChild(content);
  
  return div;
}
