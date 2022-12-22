const  express = require('express');
const mongoose = require('mongoose');
const  PORT = process.env.PORT || 3000

const app = express();
async function start(){
    try {
        await mongoose?.connect("mongodb+srv://hovhannes99:<password>@cluster0.s4kpx1q.mongodb.net/?retryWrites=true&w=majority",{
              useNewUrlParser:true,
              useFindAndModify:false
        });
        app.listen(PORT, ()=>{
            console.log("serverrr gawdawdawd")
        })
    }catch (e){
        console.log(e)
    }
}

start()