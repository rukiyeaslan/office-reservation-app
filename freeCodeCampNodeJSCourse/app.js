const express = require('express')
const app = express()

let {members} = require('./data')

app.use(express.static('./methods-public'))

app.get('/api/members', (req, res)=>{
    res.status(200).json({success: true, data: members})
})

app.post('/login', (req, res)=>{
    res.send('POST')
})

app.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})