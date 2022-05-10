const mongoose = require('mongoose');

let HomePeSchema = new mongoose.Schema({
    name:String,
    payHomeId: mongoose.Schema.Types.ObjectId,
    age:Number,
    upiId: String,
    acno: {
        type: Number,
        unique: true
    },
    pin: Number,
    qrCode: String
})

let HomePe = mongoose.model('pays', HomePeSchema);
module.exports = HomePe;