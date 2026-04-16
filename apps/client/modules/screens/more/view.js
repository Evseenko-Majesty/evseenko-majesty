export function render() {
  const div = document.createElement('div');
  div.className = 'home';
  
  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.paddingBottom = '100px';
  
  const title = document.createElement('h2');
  title.style.color = 'var(--text-color)';
  title.textContent = 'Ещё';
  
  content.appendChild(title);
  div.appendChild(content);
  
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  
  const navButtons = document.createElement('div');
  navButtons.style.cssText = `
    position: relative;
    display: flex;
    width: 100%;
    z-index: 1;
  `;
  
  const indicator = document.createElement('div');
  indicator.className = 'bottom-nav__indicator';
  navButtons.appendChild(indicator);
  
  const homeItem = document.createElement('button');
  homeItem.className = 'bottom-nav__item';
  homeItem.innerHTML = `
    <span class="bottom-nav__icon">🏠</span>
    <span>Главная</span>
  `;
  
  const moreItem = document.createElement('button');
  moreItem.className = 'bottom-nav__item active';
  moreItem.innerHTML = `
    <span class="bottom-nav__icon">⋯</span>
    <span>Ещё</span>
  `;
  
  navButtons.appendChild(homeItem);
  navButtons.appendChild(moreItem);
  nav.appendChild(navButtons);
  div.appendChild(nav);
  
  setTimeout(() => {
    const activeItem = nav.querySelector('.bottom-nav__item.active');
    if (activeItem && indicator) {
      indicator.style.width = activeItem.offsetWidth + 'px';
      indicator.style.transform = `translateX(${activeItem.offsetLeft}px)`;
    }
  }, 10);
  
  return { div, homeItem };
}