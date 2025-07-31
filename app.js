const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = require('./routers/router') // harus `./router`, bukan 'router'

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'RAHASIA',
    resave: false,
    saveUninitialized: false
}));
app.use(router)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
