const logger = (req, res, next) =>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    next() //middleware function
}
module.exports = {logger}
