const Product = require("../connect/models/productModel");
const CartModel = require("../connect/models/CartModel");
const CartItem = require("../connect/models/CartItem");

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    console.log(req.body);

    const cart = await CartModel.findOne({ where: { UserId: userId } });
    if (!cart) {
      await CartModel.create({ UserId: userId });
    }
    console.log("cart created successfully");

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).send("No product in the cart items");
    }

    console.log("UserId:", userId);
    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: productId },
    });
    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      console.log(newQuantity);
      await cartItem.update({ quantity: newQuantity });
      let total = product.price * quantity;
      console.log(total);
      await cartItem.update({ totalPrice: total });
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: productId,
        quantity,
        // totalPrice:total
      });
    }
    console.log(cartItem);

    res.status(200).json({
      message: "Product added to Cart Successfully",
      cartItem: cartItem,
    });
    return cart;
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};
// const calculateTotalPrice = (cartItem) => {
//   let totalPrice = 0
//   for (const item of cartItem) {
//     if (item && item.product && typeof item.product.price) {
//       totalPrice += item.product.price * item.quantity
//     }
//   }
//   return totalPrice

// };

// to get all cart items for the user
const getAllCartItems = async (req, res) => {
  const { UserId } = req.params;
  try {
    // we find a cart belonging to a specified user
    const cart = await CartModel.findOne({ where: { UserId } });
    console.log("cart is found");
    // if its not there, we console, cart not found
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // then we find all cart items associated with that cart
    const ItemsInCart = await CartItem.findAll({ where: { cartId: cart.id } });
    console.log("items are found");
    return res.status(200).send(ItemsInCart);
  } catch (error) {
    console.log("Error loading the users cart", error);
    res.status(500).send("Internal server error");
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItem = await CartItem.findAll();
    if (!cartItem) {
      res.status(404).send("carts are not found");
    }
    // const cart = await CartItem.findAll({where: {cartId: cartItem.id}})
    // console.log(cart)
    res.status(200).json(cartItem);
  } catch (error) {
    console.log("Error loading all products", error);
    res.status(500).send("Internal server error");
  }
};

// remove items in the cart
const removeItems = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const userId = req.body;

    await CartModel.destroy({ where: { id: cartItemId, userId } });
    return res.status(200).send("Product has been removed from cart");
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  addProductToCart,
  getAllCartItems,
  removeItems,
  getCartItems,
};
