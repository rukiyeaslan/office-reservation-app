const express = require('express')
const app = express()
const mongo = require('mongoose')
const assert = require('assert')  
//used when we are connecting to the database, to check if everything is correct

const uri = 'mongodb+srv://rukiyeaslan:<Cmpe2019>@cluster0.bw8zrni.mongodb.net/?retryWrites=true&w=majority'

async function connect(){
    console.log('hi')
    try{
        await mongoose.connect(uri)
        console.log('connected to mongodb')
    }catch(error){
        console.log(error)
    }
}

connect()

app.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})
