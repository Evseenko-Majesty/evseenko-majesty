export function render(user, currentTab, onTabChange) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Контент меняется в зависимости от вкладки
  const content = document.createElement('div');
  content.className = 'home__content';
  content.style.padding = '16px';
  content.style.paddingBottom = '100px';
  
  if (currentTab === 'home') {
    // Профиль внутри главной
    const profile = document.createElement('div');
    profile.className = 'profile-header';
    profile.style.padding = '0';
    profile.style.marginBottom = '20px';
    
    const avatar = document.createElement('div');
    if (user?.photo_url) {
      const img = document.createElement('img');
      img.src = user.photo_url;
      img.className = 'avatar';
      img.alt = user.first_name;
      avatar.appendChild(img);
    } else {
      avatar.className = 'avatar avatar--placeholder';
      avatar.textContent = user?.first_name?.charAt(0) || '?';
    }
    
    const info = document.createElement('div');
    info.className = 'profile-header__info';
    
    const name = document.createElement('span');
    name.className = 'profile-header__name';
    name.textContent = user?.first_name || 'Гость';
    
    const username = document.createElement('span');
    username.className = 'profile-header__username';
    username.textContent = user?.username ? '@' + user.username : '';
    
    info.appendChild(name);
    info.appendChild(username);
    profile.appendChild(avatar);
    profile.appendChild(info);
    content.appendChild(profile);
  }
  
  if (currentTab === 'more') {
    const title = document.createElement('h2');
    title.style.color = 'var(--text-color)';
    title.style.marginBottom = '16px';
    title.textContent = 'Ещё';
    content.appendChild(title);
  }
  
  div.appendChild(content);
  
  // Нижняя навигация
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'more', icon: '⋯', label: 'Ещё' }
  ];
  
  // Контейнер для кнопок
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
  
  tabs.forEach(tab => {
    const item = document.createElement('button');
    item.className = 'bottom-nav__item' + (currentTab === tab.id ? ' active' : '');
    item.innerHTML = `
      <span class="bottom-nav__icon">${tab.icon}</span>
      <span>${tab.label}</span>
    `;
    
    item.addEventListener('click', () => {
      if (currentTab !== tab.id) {
        onTabChange(tab.id);
      }
    });
    
    navButtons.appendChild(item);
  });
  
  nav.appendChild(navButtons);
  div.appendChild(nav);
  
  // Позиционируем индикатор
  setTimeout(() => {
    const activeItem = nav.querySelector('.bottom-nav__item.active');
    if (activeItem && indicator) {
      const itemWidth = activeItem.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      indicator.style.width = itemWidth + 'px';
      indicator.style.transform = `translateX(${itemLeft}px)`;
    }
  }, 10);
  
  return div;
}
