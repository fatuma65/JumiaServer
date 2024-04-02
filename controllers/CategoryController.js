const Category = require("../connect/models/Categories");
const SubCategory = require('../connect/models/SubCategory');
const NestedCategory = require('../connect/models/NestedSubCategory');
const { Model } = require("sequelize");

// create a new category
const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const category = await Category.create({ title, description });
    res.status(200).send({"Category created successfully": category});
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200),
    res.json(categories);
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500),
    res.json("Internal server error");
  }
};

// get a single category by id
const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400),
      res.json({message: "Category not found"});
    }
    res.status(200),
    res.json(category );
    // res.json({ success: true, category });
  } catch (error) {
    console.log("an error has occured", error),
    res.status(500),
    res.json({error1: "Internal server error"})
  }
};

// update a categpry
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const {title, description} = req.body
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).send("Category not found");
    }
    await Category.update({ title, description }, {where: {id : categoryId}});
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// delete a category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryToDelete = await Category.findByPk(categoryId);
    if (!categoryToDelete) {
      return res.status(400).send("Category not found");
    }
    categoryToDelete.destroy();
    res.status(200).send("Category has been successfully deleted");
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};
const getCategoryAndSubcategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: NestedCategory, 
            }
          ]
        }
      ]
    }
    )

    if (!categories) {
      console.log('Nested category found')
    }

    res.status(200),
    res.json(categories)

  }
  catch(error) {
    console.log('an error has occured getting both categories and subcategories', (error))
    res.status(500)
    res.json({error: 'Internal Server error'})
  }
}
module.exports = {
  // createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryAndSubcategory
};
