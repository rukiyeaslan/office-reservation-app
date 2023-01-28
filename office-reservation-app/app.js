const express = require('express')
const mongoose = require('mongoose')
const Desk = require('./models/desk')
const app = express()

const dbURI = 'mongodb+srv://lily:lily2@officeapp.hqnmikq.mongodb.net/office?retryWrites=true&w=majority'

app.get('/', (req, res)=>{
    res.send(`<h1>Home</h1>`)
})

app.get('/add-desk', (req, res)=>{
    const desk = new Desk({
        id: 1,
        name: 'desk 1',
        isReserved: false
    })
    desk.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/all-desks', (req, res)=>{
    Desk.find()     //returns all desks inside the collection
        .then((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            console.log(error)
        })
})

app.get('/desk?id', (req, res)=>{
    console.log(id)
    const desks = Desk.find()
    desks.filter((desk)=> desk.id === Number(id))
        .then((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            console.log
        })
})
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to db')
        app.listen(3000, ()=>{
            console.log('server is listening on port 3000')
        })
    } )
    .catch((err)=> console.log(err))


