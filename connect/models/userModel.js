const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: {type: DataTypes.STRING, allowNull: true},
    StreetName: {type: DataTypes.STRING, allowNull: true},
    region: { type: DataTypes.STRING, allowNull: true},
    city: { type: DataTypes.STRING, allowNull: true},
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
  //   { tableName: "Users" }
);
module.exports = User 
