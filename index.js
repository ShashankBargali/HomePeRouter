const express = require('express')
const app = express();
const {connectPayHome} = require('./db')
const cors = require('cors')
const hostname = '0.0.0.0'
connectPayHome();
app.use(express.json());


app.use(cors())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

app.listen(hostname, 8000, ()=>{
    console.log('Server started at port 8000')
})