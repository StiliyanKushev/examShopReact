const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
  },
  price: {
    type: Number,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  creator:{
    type:String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model('Product', productSchema);