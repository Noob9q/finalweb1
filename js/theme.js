/*
 * Задание 1: Динамическое изменение стилей (Ночная/Дневная тема)
 * Использует classList.toggle и localStorage.
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkModeClass = 'dark-mode';

// 1. Функция для применения и сохранения темы
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add(darkModeClass);
        themeToggle.textContent = '☀️ Дневной режим';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove(darkModeClass);
        themeToggle.textContent = '🌙 Ночной режим';
        localStorage.setItem('theme', 'light');
    }
}

// 2. Проверка локального хранилища при загрузке страницы (Persistence)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    applyTheme(true);
} else if (savedTheme === 'light') {
    applyTheme(false);
} 
// Если в хранилище ничего нет, оставляем тему по умолчанию (светлую).

// 3. Обработка клика на кнопку (Event Listener)
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        // Проверяем текущее состояние и переключаем
        const isCurrentlyDark = body.classList.contains(darkModeClass);
        applyTheme(!isCurrentlyDark);
    });
}