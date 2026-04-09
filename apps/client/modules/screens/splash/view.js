export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const h1 = document.createElement('h1');
  h1.className = 'splash__title';
  h1.textContent = 'EVSEENKO MAJESTY';
  
  const copyright = document.createElement('div');
  copyright.className = 'splash__copyright';
  copyright.textContent = '© 2026 Evseenko Majesty. Все права защищены.';
  
  div.appendChild(h1);
  div.appendChild(copyright);
  return div;
}
