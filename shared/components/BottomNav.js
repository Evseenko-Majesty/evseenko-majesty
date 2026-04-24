// ============================================
// НИЖНЯЯ НАВИГАЦИЯ — ОБЩИЙ КОМПОНЕНТ
// Принимает items: [{ id, label, icon }]
// ============================================

export function BottomNav(items, currentScreen, onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  
  if (!items || !items.length) return nav;
  
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'bottom-nav__item';
    if (item.id === currentScreen) {
      btn.classList.add('active');
    }
    
    const icon = document.createElement('span');
    icon.className = 'bottom-nav__icon';
    icon.innerHTML = item.icon || '';
    
    const label = document.createElement('span');
    label.className = 'bottom-nav__label';
    label.textContent = item.label || '';
    
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
