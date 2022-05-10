const mongoose = require('mongoose')

const connectPayHome = () => {
    mongoose.connect('mongodb://localhost:27017/Digital_Banking',{
        useUnifiedTopology: true
    }).then(() => console.log('Connected to DataBase')).catch(err => console.error(err))
    
}
module.exports = {connectPayHome}