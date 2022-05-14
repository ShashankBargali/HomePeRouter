const mongoose = require('mongoose');

const smtSchema = new mongoose.Schema({
    payId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const statements = mongoose.model('statements', smtSchema);
module.exports = statements