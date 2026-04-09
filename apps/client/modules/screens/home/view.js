export function render() {
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  h1.textContent = 'Главная';
  div.appendChild(h1);
  return div;
}
