// ============================================
// НИЖНЯЯ НАВИГАЦИЯ — ОБЩИЙ КОМПОНЕНТ
// items: [{ id, label, icon (SVG) }]
// ============================================

export function BottomNav(items, currentScreen, onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'bottom-nav__item' + (item.id === currentScreen ? ' active' : '');
    btn.innerHTML = item.icon + item.label;
    btn.addEventListener('click', () => onNavigate(item.id));
    nav.appendChild(btn);
  });
  
  return nav;
}
