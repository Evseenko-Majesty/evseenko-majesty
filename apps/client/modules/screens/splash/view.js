export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const logo = document.createElement('div');
  logo.className = 'splash__logo';
  logo.textContent = '👑';
  
  const h1 = document.createElement('h1');
  h1.className = 'splash__title';
  h1.textContent = 'EVSEENKO MAJESTY';

  const sloganMain = document.createElement('div');
sloganMain.className = 'splash__slogan-main';
sloganMain.textContent = 'Двигайся за пределами';

const sloganSub = document.createElement('div');
sloganSub.className = 'splash__slogan-sub';
sloganSub.textContent = 'Drive Beyond Limits';
  
  const copyright = document.createElement('div');
  copyright.className = 'splash__copyright';
  copyright.innerHTML = 'Evseenko Majesty © 2026<br>Все права защищены';

  const statusCard = document.createElement('div');
statusCard.className = 'splash__status splash__status--loading';
statusCard.innerHTML = `
  <div class="splash__status-content">
    <span class="splash__status-icon">🔄</span>
    <span class="splash__status-text">Подключение к серверу...</span>
  </div>
  ';

  
  div.appendChild(logo);
  div.appendChild(h1);
  div.appendChild(sloganMain);
  div.appendChild(sloganSub);
  div.appendChild(statusCard);
  div.appendChild(copyright);
  return div;
}
