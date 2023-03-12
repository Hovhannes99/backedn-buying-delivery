const {Schema, model } = require("mongoose")


const Order = new Schema({
    id: {type: String, required:true},
    product:{type:Object, required:true},
    address:{type:String,required:true},
    city:{type:String, required: true},
    count: {type:Number,  required:true},
    phone: {type:String, required: true},
    status:{type:String, required:true},
    totalPrice: {type: Number, required: true},
    username:{type: String, required: true},
    email:{type:String, required: true}
})


module.exports = model('Order', Order)