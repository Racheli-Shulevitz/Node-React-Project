const express = require("express")
const productController = require("../controllers/productController")
const router = express.Router()

router.get("/getAll", productController.getAllProducts)
router.post("/create", productController.createProduct)
router.post("/update", productController.updatProduct)
router.delete("/delete", productController.deleteProduct)

module.exports = router