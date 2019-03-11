const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/register',
  [
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.')
      .custom((value, { req }) => {
        if (value !== req.body.rpassword) {
          throw new Error("Passwords do not match");
        }
        else {
          return value;
        }
      }),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid username.')
  ]
  , authController.signUp);
router.post('/login', authController.signIn);

module.exports = router;
