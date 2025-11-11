$(document).ready(function() {
    // ======================================================================
    // 0. ТЕСТОВЫЙ ПОЛЬЗОВАТЕЛЬ (ВРЕМЕННЫЙ ОБХОД)
    //    Создает пользователя и автоматически входит под ним при первом запуске,
    //    чтобы можно было сразу тестировать рейтинг и профиль.
    // ======================================================================
    function createTestUserIfNecessary() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.length === 0) {
            const testUser = {
                name: "Тест-Пользователь",
                email: "test@qjleague.kz",
                password: "password123", // Пароль для входа в будущем
                rating: {} // Объект для сохранения рейтингов
            };
            users.push(testUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Автоматический вход
            const loggedInUserState = {
                name: testUser.name,
                email: testUser.email
            };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUserState));
            console.log("Тестовый пользователь создан и автоматически вошел: test@qjleague.kz");
        }
    }
    // Вызываем эту функцию перед всем остальным, чтобы обеспечить наличие пользователя
    createTestUserIfNecessary(); 

    // ======================================================================
    // 1. УПРАВЛЕНИЕ РЕГИСТРАЦИЕЙ (SIGN UP)
    // ======================================================================
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        const name = $('#signup-name').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();

        if (!name || !email || !password) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            alert('Пользователь с таким email уже зарегистрирован.');
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            rating: {}
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        $('#signup-form')[0].reset();
        alert('Регистрация прошла успешно! Теперь вы можете войти.');
        
        // Переключение на вкладку Входа
        const loginTab = new bootstrap.Tab(document.getElementById('login-tab'));
        loginTab.show(); 
    });

    // ======================================================================
    // 2. УПРАВЛЕНИЕ ВХОДОМ (LOG IN)
    // ======================================================================
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        const email = $('#login-email').val();
        const password = $('#login-password').val();

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            const loggedInUserState = {
                name: foundUser.name,
                email: foundUser.email
            };
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUserState));
            alert('Вход успешен! Добро пожаловать, ' + foundUser.name);
            // ПЕРЕНАПРАВЛЕНИЕ НА ПРОФИЛЬ
            window.location.href = 'profile.html'; 
        } else {
            alert('Неверный email или пароль.');
        }
    });

    // ======================================================================
    // 3. УПРАВЛЕНИЕ ВЫХОДОМ (LOG OUT)
    // ======================================================================
    // ВАЖНО: Кнопка с id="logout-btn" должна быть на странице profile.html
    $('#logout-btn').on('click', function() {
        localStorage.removeItem('loggedInUser');
        alert('Вы успешно вышли из системы.');
        // ПЕРЕНАПРАВЛЕНИЕ НА ГЛАВНУЮ СТРАНИЦУ
        window.location.href = 'index.html';
    });

    // ======================================================================
    // 4. ОБНОВЛЕНИЕ ИНТЕРФЕЙСА (НАВИГАЦИЯ)
    // ======================================================================
    function updateAuthUI() {
        const userState = localStorage.getItem('loggedInUser');
        const loggedIn = userState !== null;
        let userName = loggedIn ? JSON.parse(userState).name : 'Профиль';

        if (loggedIn) {
            $('.auth-link').hide(); 
            $('.profile-link').show();
            // Обновляем текст ссылки "Профиль" на имя пользователя
            $('.profile-link a').html(`<i class="fa-solid fa-user"></i> ${userName}`);
        } else {
            $('.auth-link').show();
            $('.profile-link').hide();
        }
    }

    // ======================================================================
    // 5. ЗАГРУЗКА ДАННЫХ ПРОФИЛЯ (profile.html)
    // ======================================================================
    function loadUserProfile() {
        const userState = localStorage.getItem('loggedInUser');

        if (!userState) {
            // Если не вошли, перенаправляем на страницу входа
            window.location.href = 'auth.html';
            return;
        }

        const user = JSON.parse(userState);
        
        // Отображаем данные
        $('#profile-name').text(user.name);
        $('#profile-email').text(user.email);
        
        // Ищем полное имя пользователя в массиве users, чтобы найти его рейтинг
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const fullUser = users.find(u => u.email === user.email);

        if (fullUser && Object.keys(fullUser.rating).length > 0) {
            let ratingHtml = '<h5>Ваши оценки игроков:</h5><ul class="list-group">';
            // Итерация по объекту рейтинга (ключ=ID игрока, значение=рейтинг)
            for (const [playerId, rating] of Object.entries(fullUser.rating)) {
                // Предполагаем, что playerId - это имя игрока (для простоты)
                const stars = '⭐'.repeat(rating); 
                ratingHtml += `<li class="list-group-item d-flex justify-content-between">
                                    <span>Игрок: <strong>${playerId}</strong></span>
                                    <span>Рейтинг: <strong>${stars}</strong> (${rating}/5)</span>
                                </li>`;
            }
            ratingHtml += '</ul>';
            $('#user-ratings-container').html(ratingHtml);
        } else {
            $('#user-ratings-container').html('<p class="text-muted">Вы пока не оставили оценок ни одному игроку.</p>');
        }
    }


    // Инициализация при загрузке страницы
    updateAuthUI();

    // Если мы находимся на странице profile.html, загружаем данные
    if (window.location.pathname.includes('profile.html')) {
        loadUserProfile();
    }
});