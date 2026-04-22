// ============================================
// НИЖНЯЯ НАВИГАЦИЯ — ОБЩИЙ КОМПОНЕНТ
// Принимает массив пунктов и текущий экран
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
    btn.textContent = item.label;
    btn.addEventListener('click', () => onNavigate(item.id));
    nav.appendChild(btn);
  });
  
  return nav;
}
