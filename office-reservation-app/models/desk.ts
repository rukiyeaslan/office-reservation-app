import mongoose from "mongoose"
// const mongoose = require('mongoose')
const Schema = mongoose.Schema

//make our schema
const deskSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    isReserved: {type: Boolean, required: true}
})

//create the model based on the schema we created
const Desk = mongoose.model('Desk', deskSchema)

module.exports = Desk
