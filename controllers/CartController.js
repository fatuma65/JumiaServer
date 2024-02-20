const Product = require("../connect/models/productModel");
const CartModel = require("../connect/models/CartModel");
const CartItem = require("../connect/models/CartItem");

const addProductToCart = async (req, res) => {
  try {
    // this is what is requested from the server
    const { productId, quantity, UserId } = req.body;
    console.log(req.body);
    console.log("UserId:", UserId);

    // look for the User with a specified cart id
    const cart = await CartModel.findOne({ where: { UserId: UserId } });
    if (!cart) {
      // if cart is not found, we create one with the user id
      await CartModel.create({ UserId: UserId });
    }
    console.log("cart created successfully");
    // if successful, we look for the product and its id
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).send("No product in the cart items");
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId: productId },
    });
    if (cartItem) {
      const newQuantity = cartItem.quantity + parseInt(quantity, 10);
      console.log(newQuantity);
      let totalPrice = product.price * newQuantity;
      console.log(totalPrice);
      await cartItem.update({ quantity: newQuantity, totalPrice: totalPrice });
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: productId,
        quantity: parseInt(quantity, 10),
        // UserId
        // totalPrice:total
      });
    }
    console.log(cartItem);

    res.status(200).json(cartItem);
    // return cart;
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
