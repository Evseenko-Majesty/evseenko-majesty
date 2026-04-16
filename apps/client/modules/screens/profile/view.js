export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.paddingBottom = '100px';
  
  const title = document.createElement('h2');
  title.style.color = 'var(--text-color)';
  title.style.marginBottom = '24px';
  title.style.fontSize = '28px';
  title.style.fontWeight = '600';
  title.textContent = 'Профиль';
  
  content.appendChild(title);
  div.appendChild(content);
  
  return div;
}