import { Header } from '/shared/components/Header.js';
import { UserInfo } from '/shared/components/UserInfo.js';
import { CityLabel } from '/shared/components/CityLabel.js';

export function render(user, onProfileClick, onCityClick, cityName) {
  const div = document.createElement('div');
  div.className = 'home';
  
  div.appendChild(CityLabel(cityName, onCityClick));
  
  const userInfo = UserInfo(user, { showUsername: true });
  userInfo.style.cursor = 'pointer';
  userInfo.addEventListener('click', onProfileClick);
  
  div.appendChild(Header(userInfo));
  return div;
}
