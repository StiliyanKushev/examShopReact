const router = require('express').Router();
const authCheck = require("../config/auth-check");
const validator = require('validator');
const Product = require('../models/Product');
const User = require('../models/User');

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
function getLatestProducts(req, res, next) {
  Product.find().sort('-date').limit(2)
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

  await new Product({
    //pass the req.values to the scheme
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
    creator: req.body.creator,
  }).save();

  return res.status(200).json({
    success: true,
    message: "Product created."
  })
}

async function buyProduct(req, res, next) {
  const productId = req.params.id;
  const buyerUsername = req.body.username;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(200).json({
      success: false,
      message: "The product you are trying to buy is already bought or doesn't exist",
    })
  }
  else {
    //check if the product is not the buyer's products
    if (buyerUsername === product.creator) {
      return res.status(200).json({
        success: false,
        message: "You can't buy your own product.",
      })
    }
    //find the buyer's user model
    const buyer = await User.findOne({ username: buyerUsername });
    //find the seller's user model
    const seller = await User.findOne({ username: product.creator });
    //add the product to the buyer's inventory
    const prodObj = { creator:product.creator, title: product.title, description: product.description, price: product.price, imageUrl: product.imageUrl };
    await User.update(
      { _id: buyer._id },
      { $push: { inventory: prodObj } });
    //add it to the other users sold items
    await User.update(
      { _id: seller._id },
      { $push: { soldItems: prodObj } });
    //remove from the shop
    product.remove();

    return res.status(200).json({
      success: true,
      message: "Product is successfuly bought",
    })
  }
}

async function removeProduct(req, res, next) {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(200).json({
      success: false,
      message: "The product you are trying to delete doesn't exist",
    })
  }
  else {
    product.remove();

    return res.status(200).json({
      success: true,
      message: "Product is successfuly deleted",
    })
  }
}

async function editProduct(req, res, next) {
  //the sellform validation is the same as the edit one
  const validationResult = validateSellForm(req.body);
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  try {
    const product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.price = req.body.price;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product edited."
    })
  }
  catch (error) {
    return res.status(200).json({
      success: false,
      message: "The product you are trying to edit doesn't exist",
    })
  }
}

function getSellingProducts(req, res, next) {
  Product.find({creator: req.headers.username})
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
function getSoldProducts(req, res, next) {
  User.findOne({username:req.headers.username})
    .then((user) => {
      res
        .status(200)
        .json({ message: 'Fetched products successfully.', products: user.soldItems });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}
function getBoughtProducts(req, res, next) {
  User.findOne({username:req.headers.username})
    .then((user) => {
      res
        .status(200)
        .json({ message: 'Fetched products successfully.', products: user.inventory });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
}

router.get('/products', getProducts);
router.get('/products/latest', getLatestProducts);

router.post('/product/create', authCheck, createProduct);
router.post('/product/buy/:id', authCheck, buyProduct);
router.post('/product/remove/:id', authCheck, removeProduct);
router.post('/product/edit/:id', authCheck, editProduct);

router.get('/products/selling', authCheck, getSellingProducts);
router.get('/products/sold', authCheck, getSoldProducts);
router.get('/products/bought', authCheck, getBoughtProducts);
module.exports = router;