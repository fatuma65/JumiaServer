const {
  getAllCategories,
  getCategory,
  deleteCategory,
  getCategoryAndSubcategory,
  updateCategory,
} = require("../controllers/CategoryController");
const {
  createCategoryWithSubCategory,
  createNestedcategory,
  getAllSubCategories,
  getAllNestedCategories
} = require("../controllers/SubCategory");

const router = require("express").Router();

router.get("/get/category", getAllCategories);
router.get("/get/category/:id", getCategory);
router.delete("/delete/category/:id", deleteCategory);
router.put("/update/category/:id", updateCategory);
router.get("/get/subcategory", getAllSubCategories);
router.get("/get/nestedsubcategory", getAllNestedCategories);
router.get("/get/allCategories", getCategoryAndSubcategory);


router.post("/create/subcategory", createCategoryWithSubCategory);
router.post("/create/nestedsubcategory", createNestedcategory);

module.exports = router;
