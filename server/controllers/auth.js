const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  let errorIndex = errors.array().length - 1;
  if (!errors.isEmpty() && errors.array()[0].msg) {
    while (errors.array()[errorIndex].msg == "Invalid value") {
      errorIndex--;
    }
  }

  if (!errors.isEmpty()) {
    res.status(422).json({
      message: errors.array()[0].msg ? errors.array()[errorIndex].msg : errors.array()[0].message,
      errors: errors.array()
    });
    return false;
  }

  return true;
}

module.exports = {
  signUp: async (req, res, next) => {

    if (validateUser(req, res)) {
      const { username, password, email } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      const userWithThisUsername = await User.findOne({ username });
      if (userWithThisUsername) {
        res.status(409)
          .json({ message: "A user with this name already exists" });
      }
      else {
        User.create({
          email,
          hashedPassword,
          username,
          salt
        }).then((user) => {
          res.status(201)
            .json({ message: 'User created!', userId: user._id, username: user.username });
        })
          .catch((error) => {
            // if (error.code === 11000) {
            //   error.statusCode = 409;
            // }
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          });
      }
    }
  },
  signIn: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const error = new Error('Username or password is incorrect');
          error.statusCode = 401;
          throw error;
        }

        if (!password || !user.authenticate(password)) {
          const error = new Error('Username or password is incorrect');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({
          username: user.username,
          userId: user._id.toString()
        }
          , 'somesupersecret'
          , { expiresIn: '1h' });

        res.status(200).json(
          {
            message: 'User successfully logged in!',
            token,
            userId: user._id.toString(),
            username: user.username,
            isAdmin: user.roles.indexOf('Admin') != -1
          });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
};