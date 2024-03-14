const Category = require("../connect/models/Categories");
const NestedSubCategory = require("../connect/models/NestedSubCategory");
const SubCategory = require("../connect/models/SubCategory");

const createCategoryWithSubCategory = async (req, res) => {
  try {
    const { title, subCategoryNames } = req.body;
    const category = await Category.create({ title });

    const createdsubCategory = [];
    for (const subCategoryName of subCategoryNames) {
      const subcategory = await SubCategory.create({
        name: subCategoryName,
        categoryId: category.id,
      });
      createdsubCategory.push(subcategory);
    }
    console.log("Category with sub category created successfully", category);
    console.log("sub Categories", createdsubCategory);
    res.status(200).json({ category, subCategoryNames, createdsubCategory });
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
    console.log(error);
  }
};

const createNestedcategory = async (req, res) => {
  try {
    const { title, subCategoryId } = req.body;
    const existingCategory = await SubCategory.findByPk(subCategoryId);
    if (!existingCategory) {
      console.log("Category not found");
    }

    const subNestedCategory = await NestedSubCategory.create({
      title,
      subCategoryId,
    });
    console.log(subNestedCategory);
    res.status(201).json(subNestedCategory);
    console.log("Nested Category created successfully");
  } catch (error) {
    res.status(500).send({ error: "Internal Server error" });
    console.log(error);
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    const categories = await SubCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};
const getAllNestedCategories = async (req, res) => {
  try {
    const categories = await NestedSubCategory.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};
module.exports = { createCategoryWithSubCategory, createNestedcategory, getAllSubCategories, getAllNestedCategories };
