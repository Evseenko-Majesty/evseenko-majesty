// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ПРЕДСТАВЛЕНИЕ
// ============================================

import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';
import { Slogan } from '/shared/components/Slogan.js';
import { Copyright } from '/shared/components/Copyright.js';
import { StatusCard } from '/shared/components/StatusCard.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  const brandBlock = document.createElement('div');
  brandBlock.className = 'splash__brand';
  brandBlock.appendChild(Logo());
  brandBlock.appendChild(BrandName());
  
  const { div: statusDiv, icon, text } = StatusCard();
  
  div.appendChild(brandBlock);
  div.appendChild(Slogan());
  div.appendChild(Copyright());
  div.appendChild(statusDiv);
  
  return { div, statusDiv, statusIcon: icon, statusText: text };
}
