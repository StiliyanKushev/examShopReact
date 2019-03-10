const Product = require('../models/Product');

module.exports = {
  getProducts: (req, res) => {
    Product.find()
      .then((products) => {
        res
          .status(200)
          .json({ message: 'Fetched products successfully.', products });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createProduct: (req, res) => {
    const productObj = req.body;
    Product.create(productObj)
    .then((product) => {
      res.status(200)
        .json({
          message: 'Product created successfully!',
          product
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  }
}