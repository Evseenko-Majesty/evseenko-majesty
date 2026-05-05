// ============================================
// ВЫБОР ГОРОДА
// ============================================

import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { SearchCard } from '/shared/components/SearchCard.js';
import { CitiesAPI } from '/shared/js/api/cities.js';

export async function render(onCitySelect) {
  const div = document.createElement('div');
  div.className = 'city-select';
  
  div.appendChild(PageTitle('Выбор города'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  // Поиск
  content.appendChild(SearchCard('Введите город...', async (query) => {
    const res = await CitiesAPI.searchCities(query);
    resultArea.innerHTML = '';
    if (res.success && res.cities.length > 0) {
      renderCityList(res.cities, resultArea, onCitySelect);
    } else {
      resultArea.innerHTML = '<p style="color: var(--text-secondary); padding: 2vh;">Ничего не найдено</p>';
    }
  }));
  
  // Область результатов
  const resultArea = document.createElement('div');
  resultArea.className = 'city-result';
  content.appendChild(resultArea);
  
  // Загружаем все города
  const res = await CitiesAPI.getCities();
  if (res.success) {
    renderCityList(res.cities, resultArea, onCitySelect);
  }
  
  div.appendChild(content);
  return div;
}

function renderCityList(cities, container, onSelect) {
  // Группируем по первой букве
  const groups = {};
  cities.forEach(city => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(city);
  });
  
  // Рендерим группы в алфавитном порядке
  Object.keys(groups).sort().forEach(letter => {
    const group = document.createElement('div');
    group.className = 'menu-group';
    
    // Заголовок с буквой
    const letterTitle = document.createElement('p');
    letterTitle.className = 'menu-social-title';
    letterTitle.textContent = letter;
    group.appendChild(letterTitle);
    
    // Города этой буквы
    groups[letter].forEach(city => {
      const cityCard = document.createElement('div');
      cityCard.className = 'menu-item';
      cityCard.textContent = city.name;
      cityCard.addEventListener('click', () => onSelect(city));
      group.appendChild(cityCard);
    });
    
    container.appendChild(group);
  });
}
