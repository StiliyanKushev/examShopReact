const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  salt: String,
  password: String,
  roles: [String],
  inventory: [{ title: String, description: String, price: Number, imageUrl: String,creator:String }],
  soldItems: [{ title: String, description: String, price: Number, imageUrl: String,creator:String }]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, '12345678')

    User.create({
      email: 'admin@admin.com',
      username: 'Admin',
      salt: salt,
      password: password,
      roles: ['Admin'],
      inventory: [],
      soldItems: []
    })
  })
}
