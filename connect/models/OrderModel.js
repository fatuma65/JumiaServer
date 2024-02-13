const { DataTypes } = require('sequelize')
const sequelize = require('../database')


const OrderModel = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true}
})

module.exports = OrderModel