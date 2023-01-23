const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    console.log(`data received ${name} ${id}`)

})

customEmitter.on('response', () => {
    console.log(`other logic here`)
})

customEmitter.emit('response', 'lily', 26)