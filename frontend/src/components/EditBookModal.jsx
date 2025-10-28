import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditBookModal({ book, onClose, onSave }) {
  const [form, setForm] = useState({
    title: book.title || '',
    author: book.author || '',
    genre: book.genre || '',
    price: book.price || 0,
    stock: book.stock || 0,
    publishedYear: book.publishedYear || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const save = () => {
    // basic validation
    if (!form.title || !form.author || !form.genre || form.price === '') {
      return alert('Please fill required fields');
    }
    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || 0, 10),
      publishedYear: form.publishedYear ? parseInt(form.publishedYear, 10) : undefined
    };
    onSave(book._id, payload);
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Author</Form.Label>
            <Form.Control name="author" value={form.author} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Genre</Form.Label>
            <Form.Control name="genre" value={form.genre} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" value={form.price} onChange={handleChange} type="number" step="0.01" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stock" value={form.stock} onChange={handleChange} type="number" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Published Year</Form.Label>
            <Form.Control name="publishedYear" value={form.publishedYear} onChange={handleChange} type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
