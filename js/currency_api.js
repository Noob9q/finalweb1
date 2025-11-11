$(document).ready(function() {
    const exchangeRateElement = $('#kzt-exchange-rate');

    if (exchangeRateElement.length === 0) {
        return; 
    }

    exchangeRateElement.text('Загрузка...');

    // ======================================================================
    // ИМИТАЦИЯ API-ЗАПРОСА ДЛЯ ОБХОДА ОШИБКИ CORS
    // ======================================================================
    console.warn("API-запрос блокирован CORS. Используется имитация данных для демонстрации функционала.");

    // Имитируем задержку сети (1 секунда)
    setTimeout(function() {
        // Данные, которые мы ожидаем получить от API
        const mockData = {
            rates: {
                KZT: 520.50 
            }
        };

        // Логика обработки данных (идентична success-функции из AJAX)
        if (mockData && mockData.rates && mockData.rates.KZT) {
            const kztRate = mockData.rates.KZT;
            const formattedRate = kztRate.toFixed(2); 
            
            exchangeRateElement.text(`1 USD = ${formattedRate} KZT (Demo)`);
        } else {
            exchangeRateElement.text('Ошибка: Курс KZT не найден (Demo).');
        }
        
    }, 1000); // Имитация задержки в 1 секунду
});