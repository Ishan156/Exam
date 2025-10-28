import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Badge } from 'react-bootstrap';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmation from './components/DeleteConfirmation';
import api from './api';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  const fetchBooks = async (q = '') => {
    try {
      const res = await api.get('/books', { params: { q } });
      setBooks(res.data);
    } catch (err) {
      toast.error('Failed to fetch books');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onAdd = async (bookData) => {
    try {
      const res = await api.post('/books', bookData);
      // prepend new book
      setBooks(prev => [res.data, ...prev]);
      toast.success('Book added');
    } catch (err) {
      toast.error('Failed to add book');
      console.error(err);
    }
  };

  const onUpdate = async (id, data) => {
    try {
      const res = await api.put(`/books/${id}`, data);
      setBooks(prev => prev.map(b => (b._id === id ? res.data : b)));
      toast.success('Book updated');
    } catch (err) {
      toast.error('Failed to update book');
      console.error(err);
    } finally {
      setEditingBook(null);
    }
  };

  const onDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
      toast.success('Book deleted');
    } catch (err) {
      toast.error('Failed to delete book');
      console.error(err);
    } finally {
      setDeletingBook(null);
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const totalCount = books.length;
  const outOfStockCount = books.filter(b => b.stock <= 0).length;

  return (
    <div className={dark ? 'bg-dark text-light min-vh-100' : 'bg-light min-vh-100'}>
      <Container className="py-4">
        <Row className="align-items-center mb-3">
          <Col><h2>Book Inventory</h2></Col>
          <Col className="text-end">
            <Badge bg="primary" className="me-2">Total: {totalCount}</Badge>
            <Badge bg={outOfStockCount > 0 ? 'danger' : 'secondary'} className="me-2">Out of stock: {outOfStockCount}</Badge>
            <Button variant={dark ? 'light' : 'dark'} onClick={() => setDark(d => !d)}>
              {dark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={8}>
            <AddBookForm onAdd={onAdd} />
          </Col>
          <Col md={4}>
            <Form onSubmit={onSearch} className="d-flex gap-2">
              <Form.Control
                placeholder="Search by title or author"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit">Search</Button>
              <Button variant="secondary" onClick={() => { setQuery(''); fetchBooks(); }}>
                Reset
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <BookList
              books={books}
              onEdit={(book) => setEditingBook(book)}
              onDelete={(book) => setDeletingBook(book)}
            />
          </Col>
        </Row>

        {editingBook && (
          <EditBookModal
            book={editingBook}
            onClose={() => setEditingBook(null)}
            onSave={onUpdate}
          />
        )}

        {deletingBook && (
          <DeleteConfirmation
            book={deletingBook}
            onCancel={() => setDeletingBook(null)}
            onConfirm={() => onDelete(deletingBook._id)}
          />
        )}

        <ToastContainer position="top-right" />
      </Container>
    </div>
  );
}

export default App;
