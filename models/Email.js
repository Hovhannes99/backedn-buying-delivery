const {Schema, model } = require("mongoose")


const Email = new Schema({
    email: {type: String, require: true,},
})


module.exports = model('Email', Email)