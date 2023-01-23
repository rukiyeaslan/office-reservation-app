//async case: tasks are started without waiting the previous one to be finished
//code looks so messy -> alternatives: async await
const {readFileSync, writeFileSync, readFile, writeFile} = require('fs')

readFile('../content/first.txt', 'utf8', (err, result) => {  //not adding 'utf8' causes error
    if(err){
        console.log(err)
        return
    }
    const first = result //first line is read without an error

    readFile('../content/second.txt', 'utf8', (err, result) => {
        if(err){
            console.log(err)
            return
        }
        const second = result  //second file is read without an error
        //time to write to a file
        writeFile('../content/result.txt', `So the result is: ${first}, ${second}`, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log(result)
        })
    })
})
