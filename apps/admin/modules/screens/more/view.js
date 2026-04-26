export function render(user, onNavigate, showGrant = false) {
  // ... профиль ...
  
  // Карточка "Доступ" — только если showGrant
  if (showGrant) {
    const grantItem = document.createElement('div');
    grantItem.className = 'menu-item';
    grantItem.innerHTML = `
      <span class="menu-item__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L3 7v6c0 5.25 3.83 10.15 9 11c5.17 -0.85 9 -5.75 9 -11V7L12 2z"/><path d="M9 12l2 2l4 -4"/></svg>
      </span>
      <span>Доступ</span>
      <span class="menu-item__arrow">›</span>
    `;
    grantItem.addEventListener('click', () => onNavigate('grant'));
    content.appendChild(grantItem);
  }
}
