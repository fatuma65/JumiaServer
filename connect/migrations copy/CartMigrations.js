module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("cart", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cart");
  },
};
