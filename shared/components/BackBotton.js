export function BackButton(onClick) {
  const btn = document.createElement('button');
  btn.className = 'page-back-btn';
  btn.textContent = '‹ Назад';
  btn.addEventListener('click', onClick);
  return btn;
}
