export function CityLabel(cityName, onClick) {
  const div = document.createElement('div');
  div.className = 'page-title city-label';
  div.textContent = cityName || 'Выбрать город';
  div.style.textTransform = 'none';  // Не заглавные буквы
  div.style.border = '1px solid var(--accent-color)';  // Золотая рамка
  if (onClick) div.addEventListener('click', onClick);
  return div;
}
