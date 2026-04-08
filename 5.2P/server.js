const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const booksRoutes = require('./routes/books.routes');

app.use('/api/books', booksRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
