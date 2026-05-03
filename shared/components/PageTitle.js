// ============================================
// ЗАГОЛОВОК СТРАНИЦЫ — ОБЩИЙ КОМПОНЕНТ
// Размещается над шапкой по центру
// ============================================

export function PageTitle(text) {
  const h1 = document.createElement('h1');
  h1.className = 'page-title';
  h1.textContent = text;
  return h1;
}
