// ============================================
// ЛОГОТИП — ОБЩИЙ КОМПОНЕНТ
// SVG логотипа Evseenko Majesty
// ============================================

export function Logo() {
  // Создаём контейнер для логотипа
  const div = document.createElement('div');
  div.className = 'logo';  // Класс для стилей из components.css
  
  // Вставляем SVG код логотипа
  // fill="currentColor" — цвет будет браться из CSS (color)
  div.innerHTML = `
    <svg viewBox="0 0 210 297" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="ТВОЙ_ПОЛНЫЙ_КОД_ЛОГОТИПА" />
    </svg>
  `;
  
  return div;
}
