const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    karma: { type: Number, default: 0 },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    referralCode: { type: String, unique: true },
    subscriptionAmount: { type: Number, default: 0 } // Для расчета 10%
});

module.exports = mongoose.model('User', UserSchema);
