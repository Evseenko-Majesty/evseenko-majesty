export function render(user, currentTab, onTabChange) {
  const div = document.createElement('div');
  div.className = 'home';
  
  // Шапка с профилем
  const header = document.createElement('div');
  header.className = 'home__header';
  
  const profile = document.createElement('div');
  profile.className = 'profile-header';
  
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
  header.appendChild(profile);
  div.appendChild(header);
  
  // Контент
  const content = document.createElement('div');
  content.className = 'home__content';
  content.style.padding = '20px 16px';
  
  if (currentTab === 'home') {
    const title = document.createElement('h2');
    title.style.color = 'var(--text-color)';
    title.style.marginBottom = '16px';
    title.textContent = 'Главная';
    content.appendChild(title);
  } else {
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
  
  const indicator = document.createElement('div');
  indicator.className = 'bottom-nav__indicator';
  nav.appendChild(indicator);
  
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'more', icon: '⋯', label: 'Ещё' }
  ];
  
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
    
    nav.appendChild(item);
  });
  
  // Позиционируем индикатор
  setTimeout(() => {
    const activeItem = nav.querySelector('.bottom-nav__item.active');
    if (activeItem) {
      const left = activeItem.offsetLeft;
      indicator.style.transform = `translateX(${left}px)`;
    }
  }, 10);
  
  div.appendChild(nav);
  
  return div;
}
