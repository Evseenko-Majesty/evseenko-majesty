// ============================================
// СЛОГАН — ОБЩИЙ КОМПОНЕНТ (две строки)
// ============================================

export function Slogan() {
  const div = document.createElement('div');
  div.className = 'slogan';
  
  // Русская строка
  const main = document.createElement('div');
  main.className = 'slogan__main';
  main.textContent = 'ДВИГАЙСЯ ЗА ПРЕДЕЛАМИ';
  
  // Английская строка
  const sub = document.createElement('div');
  sub.className = 'slogan__sub';
  sub.textContent = 'Drive Beyond Limits';
  
  div.appendChild(main);
  div.appendChild(sub);
  
  return div;
}
