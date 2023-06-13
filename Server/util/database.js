const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-project", "root", "Mysql@250", {
  dialect: "mysql",
});

module.exports=sequelize;