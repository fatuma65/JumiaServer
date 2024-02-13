const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
module.exports = CartItem;
