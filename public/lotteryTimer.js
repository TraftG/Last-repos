// Проверяем, есть ли уже сохраненная дата окончания в localStorage
let endDate = localStorage.getItem('endDate');

if (!endDate) {
    // Если нет, устанавливаем новую дату окончания на 30 дней
    endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    localStorage.setItem('endDate', endDate);
} else {
    // Преобразуем строку обратно в объект Date
    endDate = new Date(endDate);
}

function updateLotteryStatus() {
    const now = new Date();
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
        document.getElementById('lottery-status').innerText = 'Завершена';
        document.getElementById('days-left').innerText = '0';
        document.getElementById('hours-left').innerText = '0';
        document.getElementById('minutes-left').innerText = '0';
        document.getElementById('seconds-left').innerText = '0';
        clearInterval(timerInterval);
        localStorage.removeItem('endDate'); // Удаляем сохраненную дату
    } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('lottery-status').innerText = 'Активна';
        document.getElementById('days-left').innerText = days;
        document.getElementById('hours-left').innerText = hours;
        document.getElementById('minutes-left').innerText = minutes;
        document.getElementById('seconds-left').innerText = seconds;
    }
}

let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateLotteryStatus();
    timerInterval = setInterval(updateLotteryStatus, 1000);
});
