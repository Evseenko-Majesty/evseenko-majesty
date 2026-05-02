// ============================================
// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ — ОБЩИЙ КОМПОНЕНТ
// Опции: showAvatar, showName, showUsername, showRole
// ============================================

export function UserInfo(user, options = {}) {
  const div = document.createElement('div');
  div.className = 'user-info';
  
  const showAvatar = options.showAvatar !== false;
  const showName = options.showName !== false;
  const showUsername = options.showUsername !== false;
  const showRole = options.showRole || false;
  
  // Аватар
  if (showAvatar) {
    const avatar = document.createElement('div');
    avatar.className = 'user-info__avatar';
    
    if (user?.photo_url) {
      const img = document.createElement('img');
      img.src = user.photo_url;
      img.className = 'user-info__avatar-img';
      avatar.appendChild(img);
    } else {
      avatar.classList.add('user-info__avatar--placeholder');
      avatar.textContent = user?.first_name?.charAt(0) || '?';
    }
    
    div.appendChild(avatar);
  }
  
  // Текстовый блок
  const text = document.createElement('div');
  text.className = 'user-info__text';
  
  if (showName) {
    const name = document.createElement('div');
    name.className = 'user-info__name';
    name.textContent = user?.first_name 
      ? user.first_name + (user.last_name ? ' ' + user.last_name : '')
      : 'Гость';
    text.appendChild(name);
  }
  
  if (showUsername) {
    const username = document.createElement('div');
    username.className = 'user-info__username';
    username.textContent = user?.username ? '@' + user.username : '';
    text.appendChild(username);
  }
  
  if (showRole) {
    const role = document.createElement('div');
    role.className = 'user-info__role';
    role.textContent = user?.role || '';
    text.appendChild(role);
  }
  
  div.appendChild(text);
  return div;
}
