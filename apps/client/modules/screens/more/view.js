export function render() {
  const div = document.createElement('div');
  div.className = 'home';
  
  const content = document.createElement('div');
  content.style.padding = '16px';
  
  const title = document.createElement('h2');
  title.style.color = 'var(--text-color)';
  title.textContent = 'Ещё';
  
  content.appendChild(title);
  div.appendChild(content);
  
  return div;
}
