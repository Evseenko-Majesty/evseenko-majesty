// ============================================
// ЗАГРУЗКА СПРАЙТА ИКОНОК
// ============================================

export async function loadIcons() {
  try {
    const response = await fetch('/shared/assets/icons/sprite.svg');
    const svgText = await response.text();
    
    // Вставляем спрайт в начало body
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = svgText;
    document.body.insertBefore(div, document.body.firstChild);
    
  } catch (error) {
    console.error('Не удалось загрузить иконки:', error);
  }
}
