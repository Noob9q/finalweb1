/**
 * Функция для обновления текущей даты и времени
 * и отображения их в футере.
 */
function updateDateTime() {
    // 1. Получаем текущую дату и время
    const now = new Date();
    
    // 2. Определяем опции для форматирования
    const options = {
        year: 'numeric',
        month: 'long', // Полное название месяца
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Используем 24-часовой формат
    };
    
    // 3. Форматируем дату и время на русском языке (ru-RU)
    const formattedDateTime = now.toLocaleTimeString('ru-RU', options);
    
    // 4. Находим элемент по ID и обновляем его содержимое
    const dateTimeElement = document.getElementById('current-datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = `Текущая дата и время: ${formattedDateTime}`;
    }
}

// Вызываем функцию один раз, чтобы отобразить время сразу
updateDateTime();

// Устанавливаем интервал для обновления времени каждую секунду (1000 мс)
setInterval(updateDateTime, 1000);