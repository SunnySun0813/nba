const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  imgURL: String,
  description: String,
  region: String
});

module.exports = mongoose.model('Products', productSchema, 'Products'); 



