// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const logo = Logo();
  const brandName = BrandName();
  
  div.appendChild(logo);
  div.appendChild(brandName);
  
  return div;
}
