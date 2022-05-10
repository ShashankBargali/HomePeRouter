const mongoose = require('mongoose')

const connectPayHome = () => {
    mongoose.connect('mongodb+srv://shashankbb:shashank2021@cluster0.m5okb.mongodb.net/Digital_Banking?retryWrites=true&w=majority',{
        useUnifiedTopology: true
    }).then(() => console.log('Connected to DataBase')).catch(err => console.error(err))
    
}
module.exports = {connectPayHome}