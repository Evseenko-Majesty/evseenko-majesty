/* ============================================
   ЗАГРУЗОЧНЫЙ ЭКРАН — ОБЩИЕ СТИЛИ
   Используется во всех приложениях
   ============================================ */

.splash {
  position: relative;               /* Чтобы позиционировать элементы внутри */
  width: 100%;
  height: 100vh;                    /* На весь экран */
  background: var(--bg-color);      /* Фон из темы */
}

/* Логотип */
.splash .logo {
  position: absolute;               /* Позиционируется относительно .splash */
  top: -5%;                         /* Отступ от верха — МЕНЯЙ ТУТ */
  left: 50%;                        /* Центр по горизонтали */
  transform: translate(-53%, 0);    /* -53% = смещение влево от центра */
  opacity: 0;                       /* Изначально невидим */
  
  /* Анимация появления */
  animation: fadeInUp 2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
}

/* Размер SVG внутри логотипа */
.splash .logo svg {
  height: 55vh;                     /* Высота логотипа — МЕНЯЙ ТУТ */
  width: auto;                      /* Ширина подстраивается */
}

/* Анимация: появление с подъёмом */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-53%, 25px);  /* Ниже на 25px */
  }
  to {
    opacity: 1;
    transform: translate(-53%, 0);     /* Финальная позиция */
  }
}

/* Простое появление (для других элементов потом) */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
