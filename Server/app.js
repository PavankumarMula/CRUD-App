const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const showBooksRouter = require("./routes/getBooks");
const sequelize = require("./util/database");
const Product = require("./model/productModel");
const User = require("./model/userModel");

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(showBooksRouter);



Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({ name: "pavan", email: "pavan@test.com" });
    }
    return user;
  })
  .then((result) => {
    // console.log(result);
    app.listen(4000, () => console.log("Server listening on port 4000..."));
  })
  .catch((err) => console.log(err));
