const {
  getAllCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/CategoryController");

const router = require("express").Router();

router.get("/get/category", getAllCategories);
router.post("/create/category", createCategory);
router.get("/get/category/:id", getCategory);
router.delete("/delete/category/:id", deleteCategory);
router.put("/update/category/:id", updateCategory);

module.exports = router