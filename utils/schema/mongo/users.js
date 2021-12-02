const mongo = require('mongoose');
const Schema = mongo.Schema;

const mySchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    minLenght: 6,
    maxLenght: 100,
  },
  password: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
    maxLenght: 150,
  },
  isAdmin: { type: Boolean },
  isMarker: { type: Boolean },
  isClient: { type: Boolean },
});

const model = mongo.model('users', mySchema);

module.exports = model;
