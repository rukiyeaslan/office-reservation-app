const express = require('express')
const app = express()
const {logger} = require('./logger')
const authorize = require('./authorize')
// req => middleware => res

// 1. use vs route
// 2. options - our own / express / third party
//third party: morgan
//to install: nom i morgan
app.use([logger, authorize]) //we do not need to add logger manuallly to all get methods
//order matters


app.get('/', logger, (req, res)=>{
    res.send('home')
})

app.get('/about', (req, res)=>{
    res.send('about')
})

app.get('/api/v1/query', (req, res)=>{
    res.send('api')
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})