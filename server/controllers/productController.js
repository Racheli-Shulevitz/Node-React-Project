const Product = require("../modles/Product")

const createProduct = async (req, res) => {
    const { name, image, description, price, size, materials, deliverytime, warranty } = req.body
    const productFind = await Product.findOne({ name: name })
    console.log(productFind)
    if ( !name || !image || !description || !price || !size || !materials ) {
        return res.status(400).json("All fields are required")
    }
    else if (productFind) {
        return res.status(409).json({message:"Duplicate product"})
    }
    const product = await Product.create({ name, image, description, price, size, materials, deliverytime, warranty })
    res.json(`product:${product.name} created`)
}
const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}
const updatProduct = async (req, res) => {
    const { id, name, image, description, price, size, materials, deliverytime, warranty } = req.body
    if (!id || !name || !image || !description || !price || !size || !materials) {
        return res.status(400).json("All fields are required")
    }
    const product = await Product.findById({_id:id})
    product.name = name
    product.image = image
    product.description = description
    product.price = price
    product.size = size
    product.materials = materials
    product.deliverytime = deliverytime
    product.warranty = warranty
    await product.save()
    res.json(product)
}
const deleteProduct = async (req, res) => {
    const { name } = req.body
    const product = await Product.findOne({ name: name })
    await product.deleteOne()
    res.json(`product: ${product.name} deleted`)
}
module.exports = { createProduct, getAllProducts, updatProduct, deleteProduct }