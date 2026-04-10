export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
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
  
  return div;
}
