const userInfo = UserInfo(user);
userInfo.classList.add('user-info--header');
userInfo.style.cursor = 'pointer';
userInfo.addEventListener('click', onProfileClick);

// Добавляем роль (только в админке)
const roleLabel = document.createElement('div');
roleLabel.className = 'user-info__role user-info__role--header';
const ROLE_LABELS = { owner: 'Владелец', staff: 'Сотрудник', partner: 'Партнёр' };
roleLabel.textContent = ROLE_LABELS[user?.role] || '';
userInfo.querySelector('.user-info__text').appendChild(roleLabel);
