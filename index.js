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
const port = 4000;
const cartRoutes = require("./routes/cartRoutes");
const CategoryRoute = require("./routes/categoryRoute");


app.use("/users", UserRouters);
app.use("/products", productRouter);
app.use("/cart", cartRoutes);
app.use("/category", CategoryRoute);

// Relationships between different models.
Category.hasMany(Product);
Category.belongsTo(User);

Product.belongsTo(Category);
Product.belongsTo(User);
Product.belongsToMany(CartModel, { through: CartItem });
Product.belongsToMany(OrderModel, { through: OrderItem });

User.hasMany(Category);
User.hasMany(Product);
User.hasOne(CartModel);
User.hasMany(OrderModel);

CartModel.belongsTo(User);
// CartItem.belongsTo(Product)
// CartModel.hasMany(CartItem)
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
//   .sync()
//   .then(() => {
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// })
// .catch((error) => {
//   console.error(error);
// });
