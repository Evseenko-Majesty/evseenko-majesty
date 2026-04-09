/* ============================================
   ОБЩИЕ СТИЛИ ЛОГОТИПА (размер, анимация)
   ============================================ */

.logo {
    display: inline-block;
    font-size: 25vw;           /* размер по умолчанию */
    max-width: 150px;
    max-height: 150px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.6s ease-out;
}

.logo.active {
    opacity: 1;
    transform: scale(1);
}
