// require('dotenv').config()
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jumiadatabase", "postgres", "123456789", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
  define: {timestamps:true}
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database is successful");
  })
  .catch((error) => {
    console.log("An error has occured", error);
  });

// sequelize
//   .sync({force: true})
//   .then(() => {
//     console.log("Models synced successsfully");
//   })
//   .catch((error) => console.error("An error has occured", error));

  module.exports = sequelize