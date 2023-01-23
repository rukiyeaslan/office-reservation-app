const http = require('http')

const server = http.createServer((req, res) => {
    //console.log(req)
    if(req.url === '/'){
        res.end(`<h1>Welcome to our our home page</h1>
                    <p>to learn more about us <a href="/about">click</a> here</p>`)
    }
    else if(req.url === '/about'){
        res.end('Here is our history')
    }
    else {
        res.end(
        `<h1>OOPSS!! </h1>
        <p>We can't seem to find page that you are looking for</p>
        <a href="/">Back home page</a>`
    )
        }
})

server.listen(8080)