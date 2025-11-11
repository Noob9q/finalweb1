$(document).ready(function() {
    const RATING_KEY = 'users'; // Используем тот же ключ, где хранятся все пользователи
    const LOGGED_IN_KEY = 'loggedInUser';

    // ======================================================================
    // 1. ФУНКЦИЯ СОХРАНЕНИЯ РЕЙТИНГА В LOCAL STORAGE
    // ======================================================================

    function saveUserRating(userEmail, playerName, rating) {
        let users = JSON.parse(localStorage.getItem(RATING_KEY)) || [];
        
        // Находим пользователя по email
        const userIndex = users.findIndex(user => user.email === userEmail);
        
        if (userIndex !== -1) {
            // Обновляем рейтинг для конкретного игрока
            users[userIndex].rating[playerName] = rating;
            
            // Сохраняем обновленный массив пользователей
            localStorage.setItem(RATING_KEY, JSON.stringify(users));
            return true;
        }
        return false;
    }

    // ======================================================================
    // 2. ФУНКЦИЯ ОТОБРАЖЕНИЯ РЕЙТИНГА НА СТРАНИЦЕ
    // ======================================================================
    
    // Применяет визуальное выделение звезд для всех карточек игрока
    function renderRating(cardElement, rating) {
        // Находим все звезды в текущей карточке
        const stars = cardElement.find('.rating-star');
        stars.removeClass('rated'); // Сброс
        
        // Выделяем нужное количество звезд
        stars.each(function(index) {
            if (index < rating) {
                $(this).addClass('rated');
            }
        });
    }

    // ======================================================================
    // 3. ЗАГРУЗКА РЕЙТИНГА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    // ======================================================================

    // Загружает сохраненный рейтинг для текущего пользователя
    function loadRatingsForLoggedInUser() {
        const loggedInUserStr = localStorage.getItem(LOGGED_IN_KEY);
        if (!loggedInUserStr) return; // Не авторизован

        const loggedInUserEmail = JSON.parse(loggedInUserStr).email;
        const users = JSON.parse(localStorage.getItem(RATING_KEY)) || [];
        const currentUser = users.find(user => user.email === loggedInUserEmail);
        
        if (!currentUser || !currentUser.rating) return;
        
        // Проходим по всем карточкам игроков на странице
        $('.player-card').each(function() {
            const $card = $(this);
            // Получаем имя игрока из тега <p>
            const playerName = $card.find('p').text().trim();
            
            // Проверяем, есть ли рейтинг для этого игрока
            const savedRating = currentUser.rating[playerName];
            
            if (savedRating) {
                renderRating($card, savedRating);
            }
        });
    }

    // ======================================================================
    // 4. ОБРАБОТЧИК КЛИКОВ НА ЗВЕЗДАХ
    // ======================================================================

    $('.rating-system').on('click', '.rating-star', function() {
        // 1. Проверка авторизации
        const loggedInUserStr = localStorage.getItem(LOGGED_IN_KEY);
        if (!loggedInUserStr) {
            alert('Пожалуйста, войдите в систему, чтобы оценить игрока.');
            window.location.href = 'auth.html';
            return;
        }

        const loggedInUser = JSON.parse(loggedInUserStr);
        
        // 2. Определение данных
        const $card = $(this).closest('.player-card');
        const playerName = $card.find('p').text().trim(); // Имя игрока как уникальный ID
        
        // Определяем поставленный рейтинг (индекс + 1)
        const rating = $(this).index() + 1; 

        // 3. Визуальное обновление (применяем ко всем карточкам игрока на странице)
        // Находим все карточки с этим игроком (на случай дублирования)
        const allPlayerCards = $('.player-card').filter(function() {
             return $(this).find('p').text().trim() === playerName;
        });
        
        allPlayerCards.each(function() {
            renderRating($(this), rating);
        });

        // 4. Сохранение в Local Storage
        if (saveUserRating(loggedInUser.email, playerName, rating)) {
            // Оповещение можно вывести с помощью Bootstrap Toast (если он подключен)
            console.log(`Рейтинг ${rating} сохранен для ${playerName}.`);
        } else {
            alert('Ошибка сохранения рейтинга.');
        }
    });

    // Запускаем загрузку рейтинга при старте
    loadRatingsForLoggedInUser();
});