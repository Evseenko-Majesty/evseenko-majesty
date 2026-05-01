import { Logo } from '/shared/components/Logo.js';
import { BrandName } from '/shared/components/BrandName.js';

export function render() {
  const div = document.createElement('div');
  div.className = 'splash';
  
  div.appendChild(Logo());
  div.appendChild(BrandName());
  
  return div;
}
