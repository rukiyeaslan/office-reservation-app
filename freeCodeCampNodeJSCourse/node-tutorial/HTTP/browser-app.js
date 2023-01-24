const http = require('http');
const {readFileSync} = require('fs')

const homepage = readFileSync('./index.html')
const server = http.createServer((req, res)=>{
    console.log(req.url)
    const url = req.url
    //homepage
    if(url === '/'){ 
        res.writeHead(200, {'content-type':'text/html'}) //provide header
        //'text/html' will be treated as text
        res.write(homepage)
        res.end()
    }
    else if(url === '/about'){
        res.writeHead(200, {'content-type':'text/html'}) //provide header
        //'text/html' will be treated as text
        res.write(`<h1>About</h1>
                    Go to <a href='/'>home page</a>`)
        res.end()
    }
    else {
        res.writeHead(404, {'content-type':'text/html'}) //provide header
        //'text/html' will be treated as text
        res.write(`<h1>Page not found!</h1>
                    Go to <a href='/'>home page</a>`)
        res.end()
    }
    

})

server.listen(8080)