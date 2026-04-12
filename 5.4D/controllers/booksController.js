const booksService = require('../services/books.service');
//request/response layer which validates request shape, chooses HTTP status, formats JSON response.
//Calls service functions.
const STUDENT_ID = 's226035073';
const CREATE_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];
const UPDATE_FIELDS = ['title', 'author', 'year', 'genre', 'summary', 'price'];

const getUnexpectedFields = (payload, allowedFields) =>
  Object.keys(payload).filter((field) => !allowedFields.includes(field));

const formatValidationMessages = (err) => {
  if (err.name === 'ValidationError') {
    return Object.values(err.errors).map((validationError) => validationError.message);
  }

  if (err.name === 'CastError') {
    return [`${err.path} has an invalid value`];
  }

  if (err.name === 'StrictModeError') {
    return [err.message];
  }

  return ['Invalid input'];
};

const isDuplicateKeyError = (err) => err?.code === 11000;

exports.getAllBooks = async (_req, res) => {
  try {
    const items = await booksService.getAllBooks();
    res.json({
      status: 200,
      data: items,
      developedBy: STUDENT_ID,
      message: 'Books catalog retrieved from database'
    });
  } catch (_err) {
    res.status(500).json({
      status: 500,
      data: null,
      developedBy: STUDENT_ID,
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
        developedBy: STUDENT_ID,
        message: 'Book not found'
      });
    }

    res.json({
      status: 200,
      data: item,
      developedBy: STUDENT_ID,
      message: 'Book retrieved from database'
    });
  } catch (_err) {
    res.status(500).json({
      status: 500,
      data: null,
      developedBy: STUDENT_ID,
      message: 'Failed to fetch book'
    });
  }
};

exports.createBook = async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: 'Request body must be a JSON object'
    });
  }

  const unexpectedFields = getUnexpectedFields(req.body, CREATE_FIELDS);
  if (unexpectedFields.length > 0) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: `Unexpected field(s): ${unexpectedFields.join(', ')}`
    });
  }

  try {
    const createdBook = await booksService.createBook(req.body);
    return res.status(201).json({
      status: 201,
      data: createdBook,
      developedBy: STUDENT_ID,
      message: 'Book created successfully'
    });
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      return res.status(409).json({
        status: 409,
        data: null,
        developedBy: STUDENT_ID,
        message: 'Book id already exists'
      });
    }

    if (['ValidationError', 'CastError', 'StrictModeError'].includes(err.name)) {
      return res.status(400).json({
        status: 400,
        data: null,
        developedBy: STUDENT_ID,
        message: 'Validation failed',
        errors: formatValidationMessages(err)
      });
    }

    return res.status(500).json({
      status: 500,
      data: null,
      developedBy: STUDENT_ID,
      message: 'Failed to create book'
    });
  }
};

exports.updateBook = async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: 'Request body must be a JSON object'
    });
  }

  if ('id' in req.body) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: 'id is immutable and cannot be updated'
    });
  }

  const unexpectedFields = getUnexpectedFields(req.body, UPDATE_FIELDS);
  if (unexpectedFields.length > 0) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: `Unexpected field(s): ${unexpectedFields.join(', ')}`
    });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      data: null,
      developedBy: STUDENT_ID,
      message: 'At least one updatable field is required'
    });
  }

  try {
    const updatedBook = await booksService.updateBook(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).json({
        status: 404,
        data: null,
        developedBy: STUDENT_ID,
        message: 'Book not found'
      });
    }

    return res.status(200).json({
      status: 200,
      data: updatedBook,
      developedBy: STUDENT_ID,
      message: 'Book updated successfully'
    });
  } catch (err) {
    if (['ValidationError', 'CastError', 'StrictModeError'].includes(err.name)) {
      return res.status(400).json({
        status: 400,
        data: null,
        developedBy: STUDENT_ID,
        message: 'Validation failed',
        errors: formatValidationMessages(err)
      });
    }

    return res.status(500).json({
      status: 500,
      data: null,
      developedBy: STUDENT_ID,
      message: 'Failed to update book'
    });
  }
};
