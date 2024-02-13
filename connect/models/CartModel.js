const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CartModel = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // userId :{type: DataTypes.INTEGER, allowNull: false}
  },
  { timestamps: true }
);
console.log(CartModel)
// CartModel.prototype.addCartItem = async (function (cartItem) {
  
// })
module.exports = CartModel;
