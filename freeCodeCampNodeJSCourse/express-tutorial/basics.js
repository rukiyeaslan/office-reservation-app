const express = require('express')
const app = express()

//two parameters: a path and a callback function
//this callback fct is run every time user performs a get request
app.get('/', (req, res)=>{
    res.status(200).send('Home page')
})

app.get('/about', (req, res)=>{
    res.status(200).send('this is about page')
})

app.get('*', (req, res)=>{
    res.status(404).send('page not found!')
})
app.listen(3000, ()=>{
    console.log('server is running')

})