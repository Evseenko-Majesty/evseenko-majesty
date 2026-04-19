// ============================================
// КОПИРАЙТ — ОБЩИЙ КОМПОНЕНТ
// ============================================

export function Copyright() {
  const div = document.createElement('div');
  div.className = 'copyright';
  div.textContent = '© Evseenko Majesty';
  
  return div;
}
