const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("../JumiaServer/connect/database");
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "admin")));
app.use(express.static('multerConfig'))
app.use(express.urlencoded({ extended: true }));
const UserRouters = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const Category = require("./connect/models/Categories");
const Product = require("./connect/models/productModel");
const User = require("./connect/models/userModel");
const CartModel = require("./connect/models/CartModel");
const CartItem = require("./connect/models/CartItem");
const OrderModel = require("./connect/models/OrderModel");
const OrderItem = require("./connect/models/OrderItem");
const SubCategory = require('./connect/models/SubCategory')
const Admin = require('./connect/models/Admin')
const Rating = require("./connect/models/Rating");
const NestedSubCategory = require('./connect/models/NestedSubCategory')
const port = 4000;
const cartRoutes = require("./routes/cartRoutes");
const CategoryRoute = require("./routes/categoryRoute");
const adminRoutes = require('./routes/adminRoute')

app.use("/users", UserRouters);
app.use("/products", productRouter);
app.use("/cart", cartRoutes);
app.use("/category", CategoryRoute);
app.use('/admin', adminRoutes)

// Relationships between different models.

Category.belongsTo(Admin);
Category.hasMany(SubCategory, {foreignKey: 'categoryId'})

SubCategory.hasMany(NestedSubCategory, {foreignKey: "subCategoryId"})
SubCategory.belongsTo(Category, {foreignKey: 'categoryId'})

NestedSubCategory.belongsTo(SubCategory, {foreignKey: 'subCategoryId'});
Product.belongsTo(NestedSubCategory, {foreignKey: "nestedId"});
NestedSubCategory.hasMany(Product, {foreignKey: 'nestedId'})
Product.belongsToMany(CartModel, { through: CartItem });
Product.belongsToMany(OrderModel, { through: OrderItem });
Product.hasMany(Rating)

User.hasMany(Product);
User.hasOne(CartModel);
User.hasMany(OrderModel);

Rating.belongsTo(User, {foreignKey: 'userId'})

CartModel.belongsTo(User);

CartModel.belongsToMany(Product, { through: CartItem });

OrderModel.belongsTo(User);
OrderModel.belongsToMany(Product, { through: OrderItem });

app.use((req, res, err) => {
  res.status(400).send({ error: "Page not found", err});
});

app.use((err, req, res, next) => {
  console.log(`an error has occured`, err);
  res.status(500).send("internal server error");
});

// sequelize
//   .sync({force: true})
//   .then(() => {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// })
// .catch((error) => {
//   console.error(error);
// });
