var http = require('http')
var fs = require('fs')
const {writeFile, appendFile} = require('fs').promises

writeFile('./content/big.txt', "", (err, result) => {
    if(err){
        console.log(err)
    }
    //console.log(result)
})
for(let i = 0; i<10000; i++){
    //console.log('here')
    appendFile('./content/big.txt', `So the line is: ${i}\n`, (err, result) => {
        if(err){
            console.log(err)
        }
        //console.log(result)
    })}

http.createServer(function (req, res) {
//    const text = fs.readFileSync('./content/big.txt', 'utf8')
//    res.end(text)

    //if we can read data in chunks, then we can write data in chunks, too
   const fileStream = fs.createReadStream('./content/big.txt', 'utf8');
   fileStream.on('open', () => {
        fileStream.pipe(res)
   })
   fileStream.on('error', (err) => {
    res.end(err)
   })
}).listen(3000, "localhost")
