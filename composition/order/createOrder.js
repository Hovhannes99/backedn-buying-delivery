const Product = require("../../models/Product");
const User = require("../../models/User");
const Order = require("../../models/Order");
const mailer = require("../nodemailer");

const createOrder = async (req, res) => {
    try{
        const  {userId, productId, city,  address, count, phone, email } = req.body;
        console.log(userId, productId, city,  address, count, phone, email )
        const findProduct = await  Product.findById({_id: productId});


        if (city && address && count &&  phone && findProduct){
         const hasOrder = await Order.findOne({userId});
            console.log(hasOrder, "hasOrder");
            if (hasOrder){

            }
            // const order = new Order({
            //     userId,
            //     product,
            //     address,
            //     count,
            //     city,
            //     phone,
            //     status: "PENDING"
            // });
            // const message = {
            //     from: email,
            //     to: "ggroupmarcket1001@gmail.com",
            //     subscribe:"G-group",
            //     text:'You have a order for delevery',
            // }
            // await mailer(message, res);
            // await order.save();
            return   res.status(201).json({data:{isCreated: true}})
        }else{
            return  res.status(403).json({errors: { message: "should be complete all inputs", isCreated: false }})
        }
    }catch(e){
        console.log(e, "eee")
        return res.status(500).json({errors: {message: "Something goes wrong"}})
    }


};

module.exports = createOrder;
