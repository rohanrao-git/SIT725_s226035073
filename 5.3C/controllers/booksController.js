const booksService = require('../services/books.service');

exports.getAllBooks = async (req, res) => {
  try {
    const items = await booksService.getAllBooks();
    res.json({
      status: 200,
      data: items,
      message: 'Books catalog retrieved from database'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Failed to fetch books'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const item = await booksService.getBookById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'Book not found'
      });
    }

    res.json({
      status: 200,
      data: item,
      message: 'Book retrieved from database'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Failed to fetch book'
    });
  }
};

exports.integrityCheck42 = (req, res) => {
  res.status(204).send();
};
