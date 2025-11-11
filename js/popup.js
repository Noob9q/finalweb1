
// popup.js
// 1. Получаем все необходимые элементы
const openButton = document.getElementById('open-popup-btn'); // Ищет кнопку, которую вы добавили
const popupContainer = document.getElementById('popup-container'); // Ищет Pop-up контейнер
const closeButton = popupContainer.querySelector('.close-btn'); // Ищет кнопку закрытия внутри контейнера
// ...
const subscriptionForm = document.getElementById('subscription-form');


// 2. Функция для открытия модального окна
function openPopup() {
    popupContainer.classList.add('active'); // Используем класс 'active' для отображения
}

// 3. Функция для закрытия модального окна
function closePopup() {
    popupContainer.classList.remove('active'); // Удаляем класс 'active' для скрытия
}

// 4. Обработчик события для кнопки открытия
openButton.addEventListener('click', openPopup);

// 5. Обработчик события для кнопки закрытия (X)
closeButton.addEventListener('click', closePopup);

// 6. Обработчик события для закрытия по клику вне окна
popupContainer.addEventListener('click', function(event) {
    // Если клик произошел на самом контейнере (не на его содержимом), закрываем
    if (event.target === popupContainer) {
        closePopup();
    }
});

// 7. Обработчик для отправки формы (для демонстрации)
subscriptionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    alert('Спасибо за подписку! Мы свяжемся с вами.');
    // Здесь обычно отправляются данные на сервер
    
    // Очищаем форму и закрываем Pop-up
    subscriptionForm.reset();
    closePopup(); 
});