const { DataTypes } = require('sequelize')
const sequelize = require('../database')


const OrderItem = sequelize.define('orderItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER}
})

module.exports = OrderItem