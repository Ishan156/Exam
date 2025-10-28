const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  publishedYear: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
