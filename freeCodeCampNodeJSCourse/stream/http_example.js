var http = require('http')
var fs = require('fs')
const {writeFile, appendFile} = require('fs').promises

//creating a big file
writeFile('./content/big.txt', "", (err, result) => {
    if(err){
        console.log(err)
    }
})

for(let i = 0; i<10000; i++){
    appendFile('./content/big.txt', `So the line is: ${i}\n`, (err, result) => {
        if(err){
            console.log(err)
        }
    })}

http.createServer(function (req, res) {
    //if we can read data in chunks, then we can write data in chunks, too
   const fileStream = fs.createReadStream('./content/big.txt', 'utf8');
   fileStream.on('open', () => {
        fileStream.pipe(res) //after adding this, transfer-encoding under response headers becomes "chunked"
   })
   fileStream.on('error', (err) => {
    res.end(err)
   })
}).listen(3000, "localhost")
