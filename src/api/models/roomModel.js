const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    //required: true
  },
  createAt: {
    type: Date,
    //required: true
  },
});

module.exports = mongoose.model('Room', roomSchema);
