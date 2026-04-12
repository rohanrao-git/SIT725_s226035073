const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
      trim: true,
      minlength: [1, 'id must not be empty'],
      maxlength: [30, 'id must be at most 30 characters'],
      match: [/^[A-Za-z0-9_-]+$/, 'id can contain only letters, numbers, "_" and "-"']
    },
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
      minlength: [2, 'title must be at least 2 characters'],
      maxlength: [150, 'title must be at most 150 characters']
    },
    author: {
      type: String,
      required: [true, 'author is required'],
      trim: true,
      minlength: [2, 'author must be at least 2 characters'],
      maxlength: [100, 'author must be at most 100 characters']
    },
    year: {
      type: Number,
      required: [true, 'year is required'],
      min: [1450, 'year must be 1450 or later'],
      max: [currentYear + 1, `year must be ${currentYear + 1} or earlier`],
      validate: {
        validator: Number.isInteger,
        message: 'year must be an integer'
      }
    },
    genre: {
      type: String,
      required: [true, 'genre is required'],
      trim: true,
      minlength: [3, 'genre must be at least 3 characters'],
      maxlength: [50, 'genre must be at most 50 characters']
    },
    summary: {
      type: String,
      required: [true, 'summary is required'],
      trim: true,
      minlength: [10, 'summary must be at least 10 characters'],
      maxlength: [2000, 'summary must be at most 2000 characters']
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, 'price is required'],
      validate: {
        validator: (value) => {
          const numberValue = Number(value.toString());
          return Number.isFinite(numberValue) && numberValue >= 0 && numberValue <= 1000;
        },
        message: 'price must be a valid AUD amount between 0 and 1000'
      }
    }
  },
  {
    strict: 'throw',
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
