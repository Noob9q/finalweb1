// Находим все элементы с классом 'accordion-btn'
const accordionButtons = document.querySelectorAll('.accordion-btn');

// Перебираем каждую кнопку
accordionButtons.forEach(button => {
    // Добавляем обработчик события 'click' 
    button.addEventListener('click', function() {
        // 1. Переключаем класс 'active' на кнопке для стилизации
        this.classList.toggle('active');

        // 2. Находим следующий элемент (это панель с ответом)
        const panel = this.nextElementSibling;

        // 3. Проверяем, открыта ли панель
        if (panel.style.maxHeight) {
            // Если открыта (maxHeight установлен), то закрываем ее
            panel.style.maxHeight = null;
        } else {
            // Если закрыта, то открываем, устанавливая maxHeight
            // scrollHeight - это полная высота контента внутри панели
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
});