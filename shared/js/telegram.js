// ============================================
// TELEGRAM — КНОПКА НАЗАД
// ============================================

// Показать кнопку "Назад" и задать действие при нажатии
export function showBackButton(tg, callback) {
  tg.BackButton.show();
  tg.BackButton.onClick(callback);
}

// Скрыть кнопку "Назад"
export function hideBackButton(tg) {
  tg.BackButton.hide();
}
