// ============================================
// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ — ОБЩИЙ КОМПОНЕНТ
// ============================================

// Перевод ролей на русский
const ROLE_LABELS = {
  owner: 'Владелец',
  staff: 'Сотрудник',
  partner: 'Партнёр',
  client: 'Клиент'
};

export function UserInfo(user) {
  const div = document.createElement('div');
  div.className = 'user-info';
  
  // Аватар
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
  
  // Текстовый блок
  const textBlock = document.createElement('div');
  textBlock.className = 'user-info__text';
  
  // Имя + фамилия
  const name = document.createElement('div');
  name.className = 'user-info__name';
  let fullName = user?.first_name || 'Гость';
  if (user?.last_name) fullName += ' ' + user.last_name;
  name.textContent = fullName;
  
  // Никнейм
  const username = document.createElement('div');
  username.className = 'user-info__username';
  username.textContent = user?.username ? '@' + user.username : '';
  
  // Роль (на русском)
  const role = document.createElement('div');
  role.className = 'user-info__role';
  role.textContent = ROLE_LABELS[user?.role] || user?.role || '';
  
  textBlock.appendChild(name);
  textBlock.appendChild(username);
  textBlock.appendChild(role);
  
  div.appendChild(avatar);
  div.appendChild(textBlock);
  
  return div;
}
