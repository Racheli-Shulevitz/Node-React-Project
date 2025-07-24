const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const shoppingCartController=require("../controllers/shoppingCartController")

router.post("/addToCart", shoppingCartController.addToCart)
// router.use(verifyJWT)

router.delete("/deleteFromCart",shoppingCartController.deleteFromCart)
router.get("/getAllCart", shoppingCartController.getAllCart)

module.exports = router