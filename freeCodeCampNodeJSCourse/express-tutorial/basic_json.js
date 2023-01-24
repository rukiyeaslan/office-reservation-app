const express = require('express')
const app = express()

const {members} = require('./data')

console.log(members)
app.get('/', (req, res)=>{
    res.send('home page')
})

app.get('/api/members/:memberID', (req, res)=>{
    const {memberID} = req.params       //give the same name
    const singleMember = members.filter((member) => member.id == Number(memberID))
    
    if(singleMember.length == 0){
        res.send(`<h1>page not found</h1>`)
    }
    else{
        res.json(singleMember)
    }
})
app.listen(3000, ()=>{
    console.log('server is listening on port 3000')
})