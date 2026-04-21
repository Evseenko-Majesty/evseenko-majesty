// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const brandBlock = document.createElement('div');
  brandBlock.className = 'splash__brand';
  
  brandBlock.appendChild(Logo());
  brandBlock.appendChild(BrandName());
  
  div.appendChild(brandBlock);
  
  return div;
}
