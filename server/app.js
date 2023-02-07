const express = require('express')
const app = express();
const cors = require('cors')
const ErrorMiddleware = require('./Middlewares/Errors')

const cookies = require('cookie-parser')
const bodyparser = require('body-parser')


app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

app.use(cookies());
app.use(cors())

const product = require('./Routes/Product')
const auth = require('./Routes/Auth')
const order = require('./Routes/Order')

app.use('/api/v1',product)
app.use('/api/v1',order)
app.use('/api/v1',auth)

app.use(ErrorMiddleware)

module.exports = app;
