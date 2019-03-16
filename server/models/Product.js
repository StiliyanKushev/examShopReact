const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "No title given"]
  },
  description: {
    type: String,
    required: [true, "No description given"]
  },
  imageUrl: {
    type: String,
    required: [true, "No imageUrl given"],
    unique:false
  },
  price: {
    type: Number,
    required: [true, "No price given"]
  },
  date:{
    type: Date,
    default: Date.now
  },
  creator:{
    type:String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);