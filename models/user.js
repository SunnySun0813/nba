const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  like: Array,
  admin: Boolean
});

module.exports = mongoose.model('Users', userSchema, 'Users');