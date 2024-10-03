let karmaBalance = parseFloat(localStorage.getItem('karmaBalance')) || 0;

// Функция для обновления кармы на сервере
async function updateKarmaOnServer(username, amount) {
    const response = await fetch(`/karma/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.karma;
}

// Функция для расчета прибыли за час
function calculateHourlyProfit() {
    const baseProfitRate = 0.0005; // Базовая ставка прибыли на единицу кармы
    return (karmaBalance * baseProfitRate).toFixed(4); // Округление до 4 знаков после запятой
}

// Асинхронная функция для обновления кармы
async function updateKarma(amount) {
    if (karmaBalance + amount < 0) {
        console.error('Карма не может быть отрицательной.');
        return;
    }

    karmaBalance += amount;
    localStorage.setItem('karmaBalance', karmaBalance);

    const username = 'имя_пользователя'; // Замените на фактическое имя пользователя
    const newKarma = await updateKarmaOnServer(username, amount);
    
    // Обновление интерфейса
    document.getElementById('karma-balance').innerText = `${newKarma.toFixed(4)}$`;

    // Обновление прибыли
    const hourlyProfit = calculateHourlyProfit();
    document.getElementById('hourly-profit').innerText = `Прибыль за час: ${hourlyProfit}$`;
}

// Обработчик события при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('karma-balance').innerText = `${karmaBalance.toFixed(4)}$`;

    // Отображение начальной прибыли
    const hourlyProfit = calculateHourlyProfit();
    document.getElementById('hourly-profit').innerText = `Прибыль за час: ${hourlyProfit}$`;
});

// Функция для обновления кармы (можно вызвать из других частей кода)
window.updateKarma = function(amount) {
    if (typeof amount === 'number') {
        updateKarma(amount);
    } else {
        console.error('Пожалуйста, введите число для добавления к карме.');
    }
};

// Настройка интервала для автоматического обновления кармы каждый час
setInterval(() => {
    const hourlyIncrease = 0.0005; // Прибыль за час
    console.log(`Добавляем ${hourlyIncrease} к карме`); // Логирование добавления
    updateKarma(hourlyIncrease);
}, 3600000); // 3600000 мс = 1 час
