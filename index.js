const express = require('express')
const app = express();

const port = process.env.PORT || 5000;
// const {connectPayHome} = require('./db')
// const cors = require('cors')

// connectPayHome();
// app.use(express.json());


// app.use(cors())
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/user', require('./routes/user'))
app.get('/', (req, res)=> {
    res.send("hi wat'up")
})

app.listen(8000, ()=>{
    console.log('Server started at port 8000')
})