const mongo = require('mongoose');
const Schema = mongo.Schema;

const mySchema = new Schema({
  token: {
    type: String,
    required: true,
    maxLength: 100,
  },
  scopes: [
    {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
  ],
});

const model = mongo.model('api-keys', mySchema);

module.exports = model;
