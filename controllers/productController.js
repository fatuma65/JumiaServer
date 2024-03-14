const Product = require("../connect/models/productModel");
const NestedSubCategory = require('../connect/models/NestedSubCategory')

// creating a new product
const createProduct = async (req, res) => {
  const { title, description, price, nestedId } = req.body;
  console.log(req.body);
  try {
    if (!req.file) {
      res.status(400).send("file not found");
    }
    console.log("uploaded file", req.file);
    const originalName = req.file.filename;

    const category = await NestedSubCategory.findByPk(nestedId);
    console.log(category);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    const newProduct = await Product.create({
      title,
      description,
      image: originalName,
      price,
      nestedId,
    });
    await newProduct.save();
    res
      .status(200)
      .send({ Message: "Product added successfully", newProduct, category });
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// GET ALL products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: NestedSubCategory });
    if (!products) {
      res.status(404).send("Products not found");
    }
    res.status(200).json(products);
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const productid = req.params.id;
    const product = await Product.findByPk(productid);
    if (!product) {
      res.status(404).send("Product doesnot exist");
    }
    await product.destroy();
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// get 1 product by id
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (typeof productId === "undefined") {
      console.error("product Id is undefined");
    }
    if (!product) {
      res.status(404).send("Product doesnot exist");
      console.log("Product not found");
    } 
    res.status(200).json(product);

  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const [updatedRowsCount, updatedProduct] = await Product.update(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
      },
      {
        where: { id: productId },
        returning: true,
        plain: true,
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500).send("Internal server error");
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};
