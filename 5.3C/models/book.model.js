const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true }
  },
  {
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        ret.price = ret.price ? ret.price.toString() : null;
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Book', bookSchema);
