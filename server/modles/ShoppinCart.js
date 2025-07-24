const mongoose = require("mongoose")
const ShoppingCartSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
      
    }]
})
module.exports = mongoose.model("ShoppingCart",ShoppingCartSchema)