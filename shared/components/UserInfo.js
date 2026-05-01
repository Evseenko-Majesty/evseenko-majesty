// ============================================
// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ — ОБЩИЙ КОМПОНЕНТ
// Можно включать/выключать: аватар, имя, username, роль
// ============================================

export function UserInfo(user, options = {}) {
  const div = document.createElement('div');
  div.className = 'user-info';
  
  // По умолчанию показываем всё
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
      img.alt = user.first_name || '';
      avatar.appendChild(img);
    } else {
      avatar.classList.add('user-info__avatar--placeholder');
      avatar.textContent = user?.first_name?.charAt(0) || '?';
    }
    
    div.appendChild(avatar);
  }
  
  // Текстовый блок
  const textBlock = document.createElement('div');
  textBlock.className = 'user-info__text';
  
  // Имя
  if (showName) {
    const name = document.createElement('div');
    name.className = 'user-info__name';
    let fullName = user?.first_name || 'Гость';
    if (user?.last_name) fullName += ' ' + user.last_name;
    name.textContent = fullName;
    textBlock.appendChild(name);
  }
  
  // Username
  if (showUsername) {
    const username = document.createElement('div');
    username.className = 'user-info__username';
    username.textContent = user?.username ? '@' + user.username : '';
    textBlock.appendChild(username);
  }
  
  // Роль
  if (showRole) {
    const role = document.createElement('div');
    role.className = 'user-info__role';
    role.textContent = user?.role || '';
    textBlock.appendChild(role);
  }
  
  div.appendChild(textBlock);
  
  return div;
}
