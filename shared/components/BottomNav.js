// ============================================
// НИЖНЯЯ НАВИГАЦИЯ
// ============================================

export function BottomNav(items, currentScreen, onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'bottom-nav__item';
    if (item.id === currentScreen) {
      btn.classList.add('active');
    }
    
    // Иконка
    const icon = document.createElement('span');
    icon.className = 'bottom-nav__icon';
    icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24">
        <use href="/shared/assets/icons/sprite.svg#nav-${item.id}"></use>
      </svg>
    `;
    
    // Текст
    const label = document.createElement('span');
    label.className = 'bottom-nav__label';
    label.textContent = item.label;
    
    btn.appendChild(icon);
    btn.appendChild(label);
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      onNavigate(item.id);
    });
    
    nav.appendChild(btn);
  });
  
  return nav;
}
