const Product = require("../../models/Product");
const createProduct = async (req, res) => {

  try{
      const  {title,description, price,  isAvailable, variant  } = req.body;
      const { file } = req;
      if (title && description && price && file.path && variant){
          const product = new Product({
              title,
              description,
              price,
              isAvailable,
              imagesSrc: file?.path,
              variant
          });
          await product.save();
          return   res.status(201).json({data:{isCreated: true}})
      }else{
          return  res.status(403).json({errors: { message: "should be complete all inputs", isCreated: false }})
      }
  }catch (e){
      return res.status(500).json({errors: {message: "Something goes wrong"}})
  }


};

module.exports = createProduct;
