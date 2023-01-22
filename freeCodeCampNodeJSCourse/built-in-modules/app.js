const {readFileSync, writeFileSync} = require('fs')
// same as const readFileSync = require('fs') 

//read from the input file in a specified format
const first = readFileSync('../content/first.txt', 'utf8')
const second = readFileSync('../content/second.txt', 'utf8')
console.log(first, second)

//write the content in the first and second file into a file named result.txt
//if result.txt is not created, node will create it
//third object is a flag, a means append
writeFileSync(
    '../content/result.txt',
    `here is the result: ${first}, ${second}`,
    {flag: 'a'}
    )
