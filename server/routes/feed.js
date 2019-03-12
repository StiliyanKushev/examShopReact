const router = require('express').Router();
const Product = require('../models/Product');

function getProducts(req, res, next) {
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
}
function createProduct(req, res, next) {
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
      error.message = error.message.replace(/[a-zA-Z]+ validation failed: [a-zA-Z]+: /, "");
      error.message = error.message.substring(0, error.message.indexOf(","));
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}

router.get('/products', getProducts);
router.post('/product/create', createProduct);

module.exports = router;