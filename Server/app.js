const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const showBooksRouter = require("./routes/getBooks");
const sequelize = require("./util/database");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(showBooksRouter);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000, () => {
      console.log("listening on port 4000...");
    });
  })
  .catch((err) => console.log(err));
