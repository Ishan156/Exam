const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const booksRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

// Use /api/books for book routes
app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/book_inventory';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
