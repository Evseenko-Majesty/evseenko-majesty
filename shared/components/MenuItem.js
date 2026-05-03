export function MenuItem(label, icon, onClick) {
  const div = document.createElement('div');
  div.className = 'menu-item';
  div.innerHTML = `
    <span class="menu-item__icon">${icon}</span>
    <span class="menu-item__label">${label}</span>
    <span class="menu-item__arrow">›</span>
  `;
  div.addEventListener('click', onClick);
  return div;
}
