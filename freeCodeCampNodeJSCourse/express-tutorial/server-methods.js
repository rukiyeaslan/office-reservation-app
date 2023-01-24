const express = require('express')
const path = require('path')
const app = express()

//setup static and middleware
app.use(express.static('./public'))
//static means that it is a file that server doesnt have to change 

// when we are sending files we use two methods
//1: simply put all your files into public folder
//2: the method below:
app.get('/', (req, res)=>{
    console.log('home')
    res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"))
    console.log('homeout')
})


app.get('*', (req, res)=>{
    res.status(404).send('page not found sorry:/')

})


app.listen(3000, ()=>{
    console.log(`server is listening on port 3000`)
})