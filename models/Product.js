const {Schema, model } = require("mongoose")

const Product = new Schema(
    {
        title:{
            type:String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        price:{
            type: Number,
            require: true,
        },
        isAvailable: {
            type: Boolean,
            require: true
        },
        variant:{
            type: String,
            require: true
        },
        imagesSrc:{
           type:String,
           default:""
        }
    },
)


module.exports = model("Product", Product)