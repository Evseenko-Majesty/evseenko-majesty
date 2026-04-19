// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';
import { Slogan } from '/shared/components/Slogan.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const logo = Logo();
  const brandName = BrandName();
  const slogan = Slogan();
  
  div.appendChild(logo);
  div.appendChild(brandName);
  div.appendChild(slogan);
  
  return div;
}
