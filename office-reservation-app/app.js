const express = require('express')
const mongoose = require('mongoose')

const app = express()

const dbURI = 'mongodb+srv://lily:lily2@officeapp.hqnmikq.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{
        console.log('connected to db')
        app.listen(3000, ()=>{
            console.log('server is listening on port 3000')
        })
    } )
    .catch((err)=> console.log(err))


