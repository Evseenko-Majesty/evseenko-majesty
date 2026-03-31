// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Получаем данные пользователя из Telegram
const user = tg.initDataUnsafe?.user;

// Элементы
const usernameElement = document.querySelector('.username');
const greetingElement = document.querySelector('.greeting');

// Устанавливаем имя пользователя, если есть
if (user && user.first_name) {
    usernameElement.textContent = user.first_name;
    greetingElement.textContent = `ДОБРО ПОЖАЛОВАТЬ`;
} else {
    usernameElement.textContent = 'Majesty';
    greetingElement.textContent = `ПРЕМИАЛЬНЫЙ СЕРВИС`;
}

// Настройка темы (светлая/темная) в зависимости от Telegram
const setTheme = () => {
    const isDark = tg.colorScheme === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};

// Применяем тему при загрузке
setTheme();

// Слушаем изменение темы в реальном времени (если пользователь переключит тему в Telegram)
tg.onEvent('themeChanged', setTheme);

// Настройка цвета заголовка в Telegram
tg.setHeaderColor('bg_color');
tg.setBackgroundColor('bg_color');

// Плавное появление (чтобы не было моргания)
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

setTimeout(() => {
    document.body.style.opacity = '1';
}, 50);

// Логируем готовность (для отладки)
console.log('Evseenko Majesty Mini App initialized', {
    user: user ? { id: user.id, first_name: user.first_name } : null,
    theme: tg.colorScheme,
    platform: tg.platform
});