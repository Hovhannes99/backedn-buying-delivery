const {Schema, model } = require("mongoose")


const Order = new Schema({
    userId: {type: String, unique: false, required:true},
    product:{type:Array, required:true},
    address:{type:String,required:true},
    city:{type:String, required: true},
    count: {type:Number,  required:true},
    phone: {type:Number, required: true},
    status:{type:String, required:true}
})


module.exports = model('Order', Order)