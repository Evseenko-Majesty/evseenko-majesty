// ============================================
// СТРАНИЦА "ЕЩЁ"
// ============================================

import { Header } from '/shared/components/Header.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'more';
  div.appendChild(Header(null));
  return div;
}
