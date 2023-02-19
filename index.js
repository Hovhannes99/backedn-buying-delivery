const  express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const exphbs = require("express-handlebars")
const authRoutes = require('./routes/authRouter');
const createProductRoutes = require('./routes/product');
const  PORT = process.env.PORT || 3001
const cors = require('cors')
const Router   = require('express')
const routes =   new Router();




const app = express();
const hbs = exphbs.create({
    defaultLayout:"main",
    extname:"hbs"
});
app.use(cors())

app.engine("hbs", hbs.engine);
mongoose.set({
    strictQuery: false
});

app.set('view engine', 'hbs');
app.set('views','views');
app.use(express.json())

app.use('/api',authRoutes);
app.use('/api',createProductRoutes);
app.use(express.static('./assets'))
async function start(){
    try {
        await mongoose?.connect(process.env.MONGODB_URL,{
              useNewUrlParser:true,
              useUnifiedTopology: true
        });
        app.listen(PORT, ()=>{
            console.log("server runs on port " + PORT)
        })
    }catch (e){
        console.log(e, "error")
    }
}

start()