const router = require('express').Router();
const validator = require('validator');
const Product = require('../models/Product');

function validateSellForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length < 5) {
    isFormValid = false
    errors.title = 'Title must be at least 5 characters long'
  }

  if (!payload || typeof payload.imageUrl !== 'string' || !validator.isURL(payload.imageUrl, { protocols: ['http', 'https'], require_protocol: true })) {
    isFormValid = false
    errors.imageUrl = 'Please provide a correct image url'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 15 || payload.description.trim().length > 50) {
    isFormValid = false
    errors.description = 'description must be at least 15 chars long and 50 at most'
  }

  if (!payload || typeof payload.price !== 'string' || isNaN(Number(payload.price))) {
    isFormValid = false
    errors.price = 'invalid price given'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

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
async function createProduct(req, res, next) {
  const validationResult = validateSellForm(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  console.log(req.body);

  await new Product({
    //pass the req.values to the scheme
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
    creator: req.body.creator
  }).save();

  return res.status(200).json({
    success: true,
    message: "Product created."
  })
}

router.get('/products', getProducts);
router.post('/product/create', createProduct);

module.exports = router;