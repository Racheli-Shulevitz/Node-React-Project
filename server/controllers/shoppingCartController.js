const ShoppingCart = require("../modles/ShoppinCart");

const addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user._id;

    let cart = await ShoppingCart.findOne({ user: userId });
    if (!cart) {
      cart = await ShoppingCart.create({ user: userId, products: [{ product }] });
      return res.json(cart);
    }

    cart.products.push({ product });
    await cart.save();
    res.json(`${cart._id} updated`);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product } = req.body;

    let cart = await ShoppingCart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== product.toString());
    await cart.save();
    res.json(`${cart._id} updated`);
  } catch (err) {
    res.status(500).json({ message: "Error deleting from cart", error: err.message });
  }
};

const getAllCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await ShoppingCart.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

module.exports = { addToCart, deleteFromCart, getAllCart };
