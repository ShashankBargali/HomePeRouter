const express = require('express')
const app = express();

const port = process.env.PORT || 5000;
const {connectPayHome} = require('./db')
const cors = require('cors')

connectPayHome();
app.use(express.json());


app.use(cors())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/transaction', require('./routes/transactions'));


app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})
