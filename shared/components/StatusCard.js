// ============================================
// СТАТУС-КАРТОЧКА
// ============================================

export function StatusCard() {
  const div = document.createElement('div');
  div.className = 'status-card';
  
  const icon = document.createElement('div');
  icon.className = 'status-card__icon';
  icon.textContent = '⟳';  // Временная заглушка
  
  const text = document.createElement('span');
  text.className = 'status-card__text';
  text.textContent = 'Подключение к серверу...';
  
  div.appendChild(icon);
  div.appendChild(text);
  
  return { div, icon, text };
}
