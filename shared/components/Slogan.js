// ============================================
// СЛОГАН — ОБЩИЙ КОМПОНЕНТ
// ============================================

export function Slogan() {
  const div = document.createElement('div');
  div.className = 'slogan';
  
  // Основной слоган (русский)
  const main = document.createElement('div');
  main.className = 'slogan__main';
  main.textContent = 'ДВИГАЙСЯ ЗА ПРЕДЕЛАМИ';
  
  // Второстепенный слоган (английский, прозрачнее)
  const sub = document.createElement('div');
  sub.className = 'slogan__sub';
  sub.textContent = 'Drive Beyond Limits';
  
  div.appendChild(main);
  div.appendChild(sub);
  
  return div;
}
