const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./User');
const path = require('path');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Настройка статической папки для обслуживания HTML и других файлов
app.use(express.static(path.join(__dirname, 'public')));

// Генерация случайного кода реферала
const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8);
};

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    const { username } = req.body;
    const referralCode = generateReferralCode();

    const newUser = new User({ username, referralCode });
    await newUser.save();
    res.json({
        message: "Пользователь успешно зарегистрирован",
        user: newUser,
    });
});

// Получить рефералов пользователя
app.get('/referrals/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username }).populate('referrals');
    if (user) {
        res.json({ referrals: user.referrals, referralCode: user.referralCode });
    } else {
        res.status(404).json({ msg: 'Пользователь не найден' });
    }
});

// Обновить карму пользователя и начислить вознаграждение за рефералов
app.post('/karma/:username', async (req, res) => {
    const { amount, referrerCode } = req.body;
    const user = await User.findOneAndUpdate(
        { username: req.params.username },
        { $inc: { karma: amount } },
        { new: true, upsert: true }
    );

    if (referrerCode) {
        const referrer = await User.findOne({ referralCode: referrerCode });
        if (referrer) {
            referrer.karma += 1; // Начисление кармы
            referrer.subscriptionAmount += amount * 0.1; // 10% от взноса
            await referrer.save();
        }
    }

    res.json({ karma: user.karma });
});

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для страницы друзей
app.get('/friends.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'friends.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
