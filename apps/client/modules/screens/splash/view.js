export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const h1 = document.createElement('h1');
  h1.className = 'splash__title';
  h1.textContent = 'EVSEENKO MAJESTY';
  
  div.appendChild(h1);
  return div;
}
