const Product = require("../model/productModel");

exports.getBooks = async (req, res) => {
  const allProducts = await Product.findAll();
  res.json(allProducts);
};

exports.getBookbyId = async (req, res) => {
  const prodId = req.params.id;
  try {
    const getById = await Product.findAll({ where: { id: prodId } });
    const resProduct = await getById[0];
    res.json(resProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.editProduct = async (req, res) => {
  const prodId = req.params.id;
  const { title, price, description } = req.body;

  try {
    const findProd = await Product.findOne({ where: { id: prodId } });

    if (!findProd) {
      return res.status(404).json({ error: "Product not found" });
    }

    findProd.title = title;
    findProd.price = price;
    findProd.description = description;

    const result = await findProd.save();
    console.log(result);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addbook = (req, res) => {
  const { title, price, description } = req.body;
  Product.create({
    title: title,
    price: price,
    description: description,
    userId: req.user.id // Access req.user.id after it is set in the middleware
  })
    .then((result) => {
      console.log(result);
      res.json("Product received successfully");
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const desiredProduct = await Product.findOne({ where: { id: productId } });

    if (!desiredProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    await desiredProduct.destroy();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
