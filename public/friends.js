async function fetchReferrals(username) {
    const response = await fetch(`http://localhost:5000/referrals/${username}`);

    if (response.ok) {
        const data = await response.json();
        const referralList = document.getElementById('referral-list');
        const referralLink = document.getElementById('referral-link');

        // Отображаем рефералов
        referralList.innerHTML = ''; // Очищаем предыдущие данные
        data.referrals.forEach(referral => {
            const div = document.createElement('div');
            div.innerText = `Реферал: ${referral.username}`;
            referralList.appendChild(div);
        });

        // Отображаем реферальную ссылку
        referralLink.innerText = `http://localhost:5000/register?ref=${data.referralCode}`;
    } else {
        alert('Ошибка при получении рефералов');
    }
}

// Получение имени пользователя из URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (username) {
    fetchReferrals(username);
} else {
    alert('Имя пользователя не указано');
}