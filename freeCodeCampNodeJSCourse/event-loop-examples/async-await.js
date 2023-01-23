const { readFile, writeFile, read } = require('fs').promises

const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

// getText('../content/first.txt').then((result) => {
//     console.log(result).catch((err) => {
//         console.log(err)
//     })
// })


//final approach
const start = async () => {
    try {
        const first = await readFile('content/first.txt', 'utf8')
        const second = await readFile('content/second.txt', 'utf8')
        await writeFile('content/result.txt', `the awaited result is: ${first} ${second}`, {flag: 'a'})
        console.log(first, second)
    }
    catch (error){
        console.log(error)
    }
}
start()