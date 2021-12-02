const mongo = require('mongoose');
const Schema = mongo.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10000,
  },
  image: { type: String },
  price: { type: Schema.Types.Decimal128 },
  tags: [
    {
      type: String,
      maxLength: 30,
      required: true,
      lowercase: true,
      trim: true,
    },
  ],
});

const model = mongo.model('products', mySchema);

module.exports = model;
