const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} = require("../controllers/productController");
const upload = require("../multerConfig/multerCon");
const router = require("express").Router();

router.post("/create/product", upload.single("image"), createProduct);
router.get("/get/products", getAllProducts);
router.delete("/delete/product/:id", deleteProduct);
router.get("/get/:id", getProduct);
router.put("/update/product", updateProduct);

module.exports = router;
