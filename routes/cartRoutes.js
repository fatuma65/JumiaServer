const {
  getAllCartItems,
  removeItems,
  addProductToCart,
  getCartItems,
} = require("../controllers/CartController");

const router = require("express").Router();

router.get("/get/cart/:UserId", getAllCartItems);
router.get("get/cart", getCartItems);
router.delete("/cart/remove", removeItems);
router.post("/create/cart", addProductToCart);

module.exports = router;
