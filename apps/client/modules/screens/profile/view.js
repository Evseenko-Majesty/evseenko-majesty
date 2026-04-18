export function render(user) {
  const div = document.createElement('div');
  div.className = 'home';
  
  const content = document.createElement('div');
  content.style.padding = '16px';
  content.style.paddingBottom = '100px';
  
  // Шапка: корона + заголовок
  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
  `;
  
  const crown = document.createElement('span');
  crown.style.cssText = `
    font-size: 24px;
    line-height: 1;
  `;
  crown.textContent = '👑';
  
  const title = document.createElement('h2');
  title.style.cssText = `
    color: var(--text-color);
    font-size: 28px;
    font-weight: 600;
    margin: 0;
  `;
  title.textContent = 'Профиль';
  
  header.appendChild(crown);
  header.appendChild(title);
  content.appendChild(header);
  
  // Аватар крупный по центру
  const avatarWrapper = document.createElement('div');
  avatarWrapper.style.cssText = `
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `;
  
  const avatar = document.createElement('div');
  avatar.style.cssText = `
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface-color);
    color: var(--accent-color);
    font-size: 48px;
    font-weight: 500;
  `;
  
  if (user?.photo_url) {
    const img = document.createElement('img');
    img.src = user.photo_url;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    `;
    img.alt = user.first_name;
    avatar.appendChild(img);
  } else {
    avatar.textContent = user?.first_name?.charAt(0) || '?';
  }
  
  avatarWrapper.appendChild(avatar);
  content.appendChild(avatarWrapper);
  
  // Имя и фамилия
  const fullName = document.createElement('div');
  fullName.style.cssText = `
    text-align: center;
    color: var(--text-color);
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 4px;
  `;
  
  let nameText = user?.first_name || 'Гость';
  if (user?.last_name) {
    nameText += ' ' + user.last_name;
  }
  fullName.textContent = nameText;
  
  // Никнейм
  const username = document.createElement('div');
  username.style.cssText = `
    text-align: center;
    color: var(--text-secondary);
    font-size: 16px;
  `;
  username.textContent = user?.username ? '@' + user.username : '';
  
  content.appendChild(fullName);
  content.appendChild(username);
  
  div.appendChild(content);
  
  return div;
}