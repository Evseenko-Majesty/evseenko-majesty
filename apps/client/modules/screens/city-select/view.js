import { Header } from '/shared/components/Header.js';
import { PageTitle } from '/shared/components/PageTitle.js';
import { SearchCard } from '/shared/components/SearchCard.js';
import { API } from '/shared/js/api.js';

export function render(onCitySelect) {
  const div = document.createElement('div');
  div.className = 'city-select';
  
  div.appendChild(PageTitle('Выбор города'));
  div.appendChild(Header(null));
  
  const content = document.createElement('div');
  content.className = 'page-with-header';
  
  // Поиск
  content.appendChild(SearchCard('Введите город...', async (query) => {
    const res = await API.searchCities(query);
    resultArea.innerHTML = '';
    if (res.success && res.cities.length > 0) {
      renderCityList(res.cities, resultArea, onCitySelect);
    } else {
      resultArea.innerHTML = '<p style="color: var(--text-secondary); padding: 2vh;">Ничего не найдено</p>';
    }
  }));
  
  const resultArea = document.createElement('div');
  resultArea.className = 'city-result';
  content.appendChild(resultArea);
  
  // Загружаем все города
  loadCities(resultArea, onCitySelect);
  
  div.appendChild(content);
  return div;
}

async function loadCities(container, onSelect) {
  const res = await API.getCities();
  if (res.success) renderCityList(res.cities, container, onSelect);
}

function renderCityList(cities, container, onSelect) {
  // Группируем по первой букве
  const groups = {};
  cities.forEach(city => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(city);
  });
  
  // Рендерим группы
  Object.keys(groups).sort().forEach(letter => {
    const group = document.createElement('div');
    group.className = 'menu-group';
    
    const letterTitle = document.createElement('p');
    letterTitle.className = 'menu-social-title';
    letterTitle.textContent = letter;
    group.appendChild(letterTitle);
    
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
