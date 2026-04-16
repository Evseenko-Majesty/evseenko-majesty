export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  const content = document.createElement('div');
  content.className = 'home__content';
  content.style.padding = '16px';
  content.style.paddingBottom = '100px';
  
  const profile = document.createElement('div');
  profile.className = 'profile-header';
  profile.style.padding = '0';
  profile.style.marginBottom = '20px';
  // Внутри render, после создания profile добавить:
profile.style.cursor = 'pointer';
profile.addEventListener('click', () => {
  this.goToProfile();
});
  
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
  homeItem.className = 'bottom-nav__item active';
  homeItem.innerHTML = `
    <span class="bottom-nav__icon">🏠</span>
    <span>Главная</span>
  `;
  
  const moreItem = document.createElement('button');
  moreItem.className = 'bottom-nav__item';
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
  
  return { div, moreItem, profile };
}
