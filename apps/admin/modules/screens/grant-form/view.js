import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { UserSearch } from '/shared/components/UserSearch.js';

export function render(onSearch) {
  const div = document.createElement('div');
  div.className = 'grant-form';
  
  div.appendChild(PageTitle('Выдача роли'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  // Поиск пользователей
  content.appendChild(UserSearch('Имя, username или ID...', onSearch));
  
  // Область результатов (пока пустая)
  const resultArea = document.createElement('div');
  resultArea.className = 'search-result';
  content.appendChild(resultArea);
  function createUserCard(user, onClick) {
  const card = document.createElement('div');
  card.className = 'user-search-card';
  
  // Аватар
  const avatar = document.createElement('div');
  avatar.className = 'user-search-card__avatar';
  if (user.photo_url) {
    const img = document.createElement('img');
    img.src = user.photo_url;
    img.className = 'user-search-card__avatar-img';
    avatar.appendChild(img);
  } else {
    avatar.textContent = user.first_name?.charAt(0) || '?';
  }
  
  // Инфо
  const info = document.createElement('div');
  info.className = 'user-search-card__info';
  
  const name = document.createElement('span');
  name.className = 'user-search-card__name';
  name.textContent = `${user.first_name || ''} ${user.last_name || ''}`;
  
  info.appendChild(name);
  
  // Стрелка
  const arrow = document.createElement('span');
  arrow.className = 'user-search-card__arrow';
  arrow.textContent = '›';
    
  div.appendChild(content);
  card.appendChild(avatar);
  card.appendChild(info);
  card.appendChild(arrow);
  card.addEventListener('click', () => onClick(user));
  
  return card;
}
  
