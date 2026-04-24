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
    // Используем HTML-entities для SVG, чтобы не грузить заново
    // home
    if (item.id === 'home') {
      icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21h14M5 21v-13M19 21v-13M9 21v-8h6v8M2 10l10-8 10 8"/></svg>`;
      // еще
    } else {
  icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14"/><path d="M5 12h14"/><path d="M5 19h14"/></svg>`;
}
    
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
