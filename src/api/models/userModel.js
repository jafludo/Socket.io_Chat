const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  connected: {
    type: Boolean,
    required: true,
    default: false
  },
  createAt: {
    type: Date,
    //required: true
  },
});

module.exports = mongoose.model('User', userSchema);
