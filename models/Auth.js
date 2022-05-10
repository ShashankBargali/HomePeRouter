const mongoose = require('mongoose');

let AuthSchema = new mongoose.Schema({
    name:String,
    age:Number,
    acno: {
        type: Number,
        unique: true
    },
    password: String,
    pin: Number,
    balance: {
        type: Number,
        default: 0
    },
    digipay: {
        type: Boolean,
        default: false
    }
})

let User = mongoose.model('users', AuthSchema);
module.exports = User;