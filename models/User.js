const {Schema, model } = require("mongoose")


const User = new Schema({
    username: {type: String, unique: false, required:true},
    email:{type:String, unique: true, required:true},
    password:{type:String, required: true},
    isVerified:{type:Boolean, default:false},
    role: {type:String, ref:"Role"}
})


module.exports = model('User', User)