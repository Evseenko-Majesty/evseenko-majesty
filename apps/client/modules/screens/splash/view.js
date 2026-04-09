export function render() {
  const div = document.createElement('div');
  div.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #03030C;
  `;
  
  const h1 = document.createElement('h1');
  h1.style.cssText = `
    margin: 0;
    color: #E5C158;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
  `;
  h1.textContent = 'EVSEENKO MAJESTY';
  
  div.appendChild(h1);
  return div;
}
