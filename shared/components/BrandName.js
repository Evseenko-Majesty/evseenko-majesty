// ============================================
// НАЗВАНИЕ БРЕНДА — ОБЩИЙ КОМПОНЕНТ
// ============================================

export function BrandName() {
  const h1 = document.createElement('h1');
  h1.className = 'brand-name';
  h1.textContent = 'EVSEENKO MAJESTY';
  
  return h1;
}
