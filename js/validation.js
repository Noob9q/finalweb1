// Находим форму и все её поля
const form = document.getElementById('contact-form');
const username = document.getElementById('username');
const email = document.getElementById('user-email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

// Добавляем обработчик на событие 'submit'
form.addEventListener('submit', function (event) {
    // 1. Предотвращаем стандартную отправку формы
    event.preventDefault();
    
    // 2. Вызываем функцию валидации и проверяем результат
    if (validateInputs()) {
        // Если все в порядке, выводим сообщение об успехе
        alert('Регистрация прошла успешно!');
        form.reset(); // Очищаем форму
        // Снимаем классы валидации, чтобы поля были чистыми
        username.classList.remove('is-valid');
        email.classList.remove('is-valid');
        password.classList.remove('is-valid');
        passwordConfirm.classList.remove('is-valid');
    }
});

// Функция для отображения ошибки
function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = message;
    element.classList.add('is-invalid'); // Красная рамка
    element.classList.remove('is-valid'); // Убираем зеленую рамку
}

// Функция для снятия ошибки
function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = '';
    element.classList.remove('is-invalid');
    element.classList.add('is-valid'); // Зеленая рамка
}

// Проверка email с помощью простого регулярного выражения
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Основная функция валидации
function validateInputs() {
    let isValid = true;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();

    // Проверка имени (Обязательное поле)
    if (usernameValue === '') {
        setError(username, 'Имя не может быть пустым');
        isValid = false;
    } else {
        setSuccess(username);
    }

    // Проверка email (Обязательное поле и формат)
    if (emailValue === '') {
        setError(email, 'Email не может быть пустым');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Введите корректный email');
        isValid = false;
    } else {
        setSuccess(email);
    }

    // Проверка пароля (Обязательное поле и длина >= 8)
    if (passwordValue === '') {
        setError(password, 'Пароль не может быть пустым');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Пароль должен быть не менее 8 символов');
        isValid = false;
    } else {
        setSuccess(password);
    }

    // Проверка подтверждения пароля (Обязательное поле и совпадение)
    if (passwordConfirmValue === '') {
        setError(passwordConfirm, 'Подтвердите пароль');
        isValid = false;
    } else if (passwordConfirmValue !== passwordValue) {
        setError(passwordConfirm, 'Пароли не совпадают');
        isValid = false;
    } else {
        setSuccess(passwordConfirm);
    }
    
    return isValid;
}