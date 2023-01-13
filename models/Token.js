const {Schema, model } = require("mongoose")

const Token = new Schema(
    {
        email:{
            type:String,
            require: true
        },
        token:{
            type: String,
            require: true
        },
        createdAt:{
            type: Date,
            default:Date.now,
            expires:3600
        }
    },
)


module.exports = model("Token", Token)