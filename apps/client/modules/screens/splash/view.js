// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';
import { Slogan } from '/shared/components/Slogan.js';
import { Copyright } from '/shared/components/Copyright.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  div.appendChild(Logo());
  div.appendChild(BrandName());
  div.appendChild(Slogan());
  div.appendChild(Copyright());
  
  return div;
}
