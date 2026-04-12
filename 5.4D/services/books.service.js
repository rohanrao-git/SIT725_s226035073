const Book = require('../models/book.model');
//data ops. runs DB actions. keeps DB logic out of controllers. returns data to controller.
const getAllBooks = async () => Book.find({}).sort({ id: 1 });

const getBookById = async (id) => Book.findOne({ id });

const createBook = async (bookPayload) => {
  const book = new Book(bookPayload);
  return book.save();
};

const updateBook = async (id, updatePayload) =>
  Book.findOneAndUpdate({ id }, { $set: updatePayload }, { new: true, runValidators: true, context: 'query' });

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};
