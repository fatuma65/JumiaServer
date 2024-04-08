const Product = require("../connect/models/productModel");
const NestedSubCategory = require('../connect/models/NestedSubCategory')

// creating a new product
const createProduct = async (req, res) => {
  const { title, description, price, nestedId } = req.body;
  console.log(req.body);
  try {
    if (!req.file) {
      res.status(400),
      res.json({message: "file not found"});
    }
    console.log("uploaded file", req.file);
    const originalName = req.file.filename;

    const category = await NestedSubCategory.findByPk(nestedId);
    console.log(category);
    if (!category) {
      res.status(404),
      res.send("Category not found");
    }
    const newProduct = await Product.create({
      title,
      description,
      image: originalName,
      price,
      nestedId,
    });
    // await newProduct.save();
    res.status(201),
    console.log(newProduct)
    res.json({ Message: "Product added successfully"}, newProduct);
    // res.json({ Message: "Product added successfully", newProduct, category });
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500),
    res.json({error1: "Internal server error"});
  }
};

// GET ALL products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: NestedSubCategory });
    if (!products) {
      res.status(404),
      res.json({error1: "Products not found"});
    }
    res.status(200),
    res.json(products);
    console.log(products)
  } catch (error) {
    res.status(500),
    res.json({error1: "Internal server error"});
    console.log("an error has occured", error);
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const productid = req.params.id;
    const product = await Product.destroy({where: {id: productid}});
    // const product = await Product.findByPk(productid);
    if (!product) {
      res.status(404),
      res.json({error1: "Product doesnot exist"});
    }
    res.status(200),
    res.json({message: "Product deleted successfully"});
  } catch (error) {
    console.log("an error has occured", error);
    res.status(500),
    res.json({error1: "Internal server error"});
  }
};

// get a product by id
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // const proId = parseInt(productId, 10)
    // console.log(proId)
    const product = await Product.findByPk(productId);
    if (typeof productId === "undefined") {
      console.error("product Id is undefined");
    }
  
    if (!product) {
      res.status(404),
      res.json({error1: "Product doesnot exist"});
      console.log("Product not found");
    } 

    const categoryName = await NestedSubCategory.findOne({where: {id: product.nestedId}})
    if (!categoryName) {
      console.log('sub category not found')
    }
    const catName = categoryName.title

    console.log(catName)
    // console.log(categoryName)
    console.log(product.nestedId)
    
    // res.status(200),
    res.json({product, catName});
    res.status(200)
    // res.json(product);

  } catch (error) {
    console.log("an error has occured getting the product", error);
    res.status(500),
    res.json({error1: "Internal server error"});
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
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
    console.log("an error has occured updating the product", error);
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
