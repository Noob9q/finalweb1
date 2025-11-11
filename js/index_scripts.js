/**
 * Задание 1: Демонстрация DOM Manipulation и Switch Statement
 * Динамическое приветствие в зависимости от времени суток
 */

function displayGreeting() {
    // 1. Используем document.getElementById для выбора элемента [cite: 19]
    const greetingElement = document.getElementById('greeting-message');
    
    // Если элемент не найден (страница не index.html), завершаем работу
    if (!greetingElement) return;

    // Получаем текущий час (от 0 до 23)
    const hour = new Date().getHours();
    let greetingText = "";

    // 2. Используем оператор switch для управления логикой [cite: 64]
    switch (true) {
        // Утро: 5:00 до 10:59
        case (hour >= 5 && hour < 11):
            greetingText = "Доброе утро! Удачного дня с QJ League!";
            break;
        // День: 11:00 до 16:59
        case (hour >= 11 && hour < 17):
            greetingText = "Добрый день! Рады видеть вас на сайте.";
            break;
        // Вечер: 17:00 до 22:59
        case (hour >= 17 && hour < 23):
            greetingText = "Добрый вечер! Время изучить последние новости.";
            break;
        // Ночь: 23:00 до 4:59
        default:
            greetingText = "Доброй ночи. Мы создаем будущее футбола Казахстана.";
            break;
    }

    // 3. Используем textContent для динамического изменения содержимого 
    greetingElement.textContent = greetingText;
}

// Вызываем функцию при загрузке страницы
displayGreeting();
