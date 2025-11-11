// =========================================================
// Вспомогательная функция для подсветки текста (Task 3)
// =========================================================
// function googleTranslateElementInit() {

function highlightTextInElement($element, term) {
    const content = $element.text();
    // Экранируем символы для корректной работы RegExp
    const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp('(' + escapedTerm + ')', 'gi');

    // Если находим совпадение, заменяем HTML
    if (content.match(regex)) {
        // $1 — это совпавший текст, который мы оборачиваем в <mark class="highlighted">
        const newContent = content.replace(regex, '<mark class="highlighted">$1</mark>');
        $element.html(newContent);
        return true; // Возвращаем true, если было совпадение
    }
    return false;
}

// =========================================================
// Функция ленивой загрузки изображений (Task 9)
// =========================================================
const $lazyImages = $('img.lazy');

function lazyLoadImages() {
    const windowTop = $(window).scrollTop();
    const windowBottom = windowTop + $(window).height();

    $lazyImages.each(function() {
        const $img = $(this);
        // Пропускаем, если изображение уже загружено
        if ($img.attr('src')) {
            return;
        }

        const imageTop = $img.offset().top;

        // Загружаем, если изображение находится в видимой области (с запасом 200px для плавности)
        // Hint: use scroll(), .offset(), .attr('src')
        if (imageTop < windowBottom + 200) { 
            const imageSrc = $img.data('src'); 

            // Устанавливаем реальный путь в src, что инициирует загрузку
            $img.attr('src', imageSrc);
            $img.removeClass('lazy');
        }
    });
}


$(document).ready(function() {
    console.log("jQuery is ready!"); // Task 0.3

    // =========================================================
    // 1. ПОДГОТОВКА ДАННЫХ ИСХОДНОГО КОНТЕНТА
    // =========================================================

    // Сохраняем исходный HTML-контент карточек для корректного удаления выделения
    const originalCardContent = [];
    $('.player-card').each(function() {
        const $card = $(this);
        originalCardContent.push({
            nameHTML: $card.find('p').html(),
            positionHTML: $card.find('.position').html(),
            element: $card
        });
    });

    // =========================================================
    // 2. АВТОЗАПОЛНЕНИЕ (Task 2)
    // =========================================================

    var playerNames = [];
    // Собираем все имена и позиции для Autocomplete
    $('.player-card').each(function() {
        var name = $(this).find('p').text().trim();
        var position = $(this).find('.position').text().trim();
        playerNames.push(name);
        playerNames.push(position);
        playerNames.push(name + ' ' + position); // Комбинированная строка
    });
    // Удаляем дубликаты
    var uniquePlayerNames = $.unique(playerNames.filter(function(n){ return n.length > 0; }));

    $("#player-search").autocomplete({
        source: uniquePlayerNames,
        minLength: 2
    });


    // =========================================================
    // 3. ЖИВОЙ ПОИСК И ВЫДЕЛЕНИЕ (Tasks 1 & 3)
    // =========================================================

    $('#player-search').on('keyup input', function() {
        const searchTerm = $(this).val().trim();
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        // 1. Восстанавливаем оригинальный контент и скрываем все карточки
        $('.player-card').each(function(index) {
            const $card = $(this);
            const originalData = originalCardContent[index];
            $card.find('p').html(originalData.nameHTML);
            $card.find('.position').html(originalData.positionHTML);
            $card.hide();
        });
        
        // Если поле пустое или короткое (меньше 2 символов), показываем все
        if (lowerSearchTerm.length < 2) {
            $('.player-card').show();
            $('.player-group').show();
            return;
        }

        // 2. Фильтрация и Подсветка
        $('.player-card').each(function() {
            const $card = $(this);
            let isMatch = false;

            // Проверяем имя игрока и выделяем его
            if (highlightTextInElement($card.find('p'), searchTerm)) {
                isMatch = true;
            }

            // Проверяем позицию игрока и выделяем ее
            if (highlightTextInElement($card.find('.position'), searchTerm)) {
                isMatch = true;
            }

            // Показываем карточку, если было найдено совпадение (Task 1: Live Filter)
            if (isMatch) {
                $card.show();
            } else {
                $card.hide();
            }
        });

        // 3. Скрываем/показываем заголовки групп
        $('.player-group').each(function() {
            if ($(this).find('.player-card:visible').length === 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });

    // =========================================================
    // 4. ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ (Task 9)
    // =========================================================

    lazyLoadImages(); 
    $(window).on('scroll resize', lazyLoadImages);
    
    // =========================================================
    // 5. ИНДИКАТОР ПРОКРУТКИ (Task 4)
    // =========================================================
    
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const windowHeight = $(window).height();
        
        // Расчет прокручиваемой области
        const scrollDepth = docHeight - windowHeight;
        
        // Расчет процента прокрутки
        const scrollPercent = (scrollDepth === 0) 
            ? 100 
            : (scrollTop / scrollDepth) * 100;

        // Применяем ширину к прогресс-бару
        $("#progress-bar").css("width", scrollPercent + "%");
    });
    // =========================================================
// 6. АНИМАЦИЯ СЧЁТЧИКА (Task 5)
// =========================================================

// Флаг, чтобы анимация запускалась только один раз
let isCounterAnimated = false;

function startCounterAnimation() {
    if (isCounterAnimated) return; 

    // Ищем все элементы с классом .count-up
    $('.count-up').each(function() {
        const $this = $(this);
        // Получаем целевое число из data-target и преобразуем в целое число
        const target = parseInt($this.data('target')); 
        
        // Анимация числа с помощью jQuery .animate()
        $({ countNum: 0 }).animate({ countNum: target }, {
            duration: 2000, // Продолжительность анимации - 2 секунды
            easing: 'swing',
            step: function(now) {
                // Применяем текущее значение, округляя его и форматируя
                $this.text(Math.floor(now).toLocaleString('ru-RU'));
            },
            complete: function() {
                // Устанавливаем точное целевое значение после анимации
                $this.text(target.toLocaleString('ru-RU'));
            }
        });
    });

    isCounterAnimated = true;
}

// Запускаем анимацию, когда секция попадает в область видимости
$(window).on('scroll', function() {
    const $statsSection = $('.stats-section');
    
    // Проверяем, существует ли секция на текущей странице (чтобы не было ошибок)
    if ($statsSection.length === 0) return;
    
    const windowBottom = $(window).scrollTop() + $(window).height();
    const sectionTop = $statsSection.offset().top;

    // Если секция стала видимой (с запасом 100px) и анимация еще не запускалась
    if (sectionTop < windowBottom - 100 && !isCounterAnimated) {
        startCounterAnimation();
    }
});

// Запускаем при загрузке на случай, если секция сразу видна
startCounterAnimation();
// =========================================================
// 7. КОПИРОВАНИЕ EMAIL И УВЕДОМЛЕНИЕ (Tasks 7 & 8)
// =========================================================

$(document).on('click', '.copy-btn', function() {
    const targetSelector = $(this).data('target');
    const $targetElement = $(targetSelector);
    // Получаем текст из data-copy, который нужно скопировать
    const textToCopy = $targetElement.data('copy'); 

    // Копирование в буфер обмена
    navigator.clipboard.writeText(textToCopy).then(function() {
        // Показываем Toast-уведомление
        const toastEl = document.getElementById('dynamicToast');
        // Убедитесь, что Bootstrap.js загружен перед этим
        const toast = new bootstrap.Toast(toastEl); 
        
        // Обновляем текст в Toast (Task 7)
        $('.toast-body', toastEl).text('Email ' + textToCopy + ' скопирован!');

        toast.show();
    }).catch(function(err) {
        console.error('Ошибка при копировании: ', err);
    });
    
});
});
