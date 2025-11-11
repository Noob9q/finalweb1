// Функция для генерации случайного шестнадцатеричного цвета (например, #A3F7CC)
function getRandomColor() {
    // Генерируем случайное число, преобразуем его в строку hex и обрезаем "0x"
    let color = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    // Если цвет получился слишком короткий (например, #FF), дополняем нулями до #0000FF
    while (color.length < 7) {
        color += '0';
    }
    return color;
}

// Находим кнопку и элемент body
const colorChangerBtn = document.getElementById('color-changer-btn');
const body = document.body;

// Добавляем обработчик события 'click'
colorChangerBtn.addEventListener('click', function() {
    // 1. Генерируем новый случайный цвет
    const newColor = getRandomColor();
    
    // 2. Применяем его к фону элемента <body>
    body.style.backgroundColor = newColor;
});