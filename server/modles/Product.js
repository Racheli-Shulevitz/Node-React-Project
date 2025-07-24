const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    materials: {
        type: [String],
        required: true
    },
    deliverytime: {
        type: String,
    },
    warranty: {
        type: String,
        default: "האחריות למוצר הינה ל-12 חודשים"
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    // },

})
// {
//     timestamps: true
// })
module.exports = mongoose.model("Product", productSchema)