const {
  getAllCartItems,
  removeItems,
  addProductToCart,
  getCartItems,
} = require("../controllers/CartController");
const express = require('express')
const app = express()
const router = require("express").Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get("/get/cart/:UserId", getAllCartItems);
router.get("get/cart", getCartItems);
router.delete("/cart/remove", removeItems);
router.post("/create/cart", addProductToCart);

module.exports = router;
