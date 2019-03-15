const PassportLocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  console.log(email)
  const user = {
    email: email.trim(),
    password: password.trim(),
    username: req.body.username.trim()
  }

  console.log(user);

  User
    .find({email: email})
    .then(users => {
      if (users.length > 0) {
        return done('E-mail already exists!')
      }

      user.salt = encryption.generateSalt()
      user.password = encryption.generateHashedPassword(user.salt, user.password)
      user.roles = []

      User
        .create(user)
        .then(() => {
          const payload = {
            sub: user.id
          }
          const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
          const data = {
            username: user.username
          }
    
          if (user.roles) {
            data.roles = user.roles
          }
    
          return done(null, token, data)
        })
        .catch((error) => {
          return done(null);
        })
    })
})
