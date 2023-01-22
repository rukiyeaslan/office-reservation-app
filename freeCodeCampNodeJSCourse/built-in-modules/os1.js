const os = require('os')  //built in module

//info abt current user
const user = user.userInfo()
console.log(user)

//method returns the systenm uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMEm: os.totalmem(),
    freeMem: os/freeMem(),
}
console.log(currentOS)