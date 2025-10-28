import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const initial = { title: '', author: '', genre: '', price: '', stock: 0, publishedYear: '' };

export default function AddBookForm({ onAdd }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title || !form.author || !form.genre || form.price === '') {
      return alert('Please fill required fields: title, author, genre, price');
    }
    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || 0, 10),
      publishedYear: form.publishedYear ? parseInt(form.publishedYear, 10) : undefined
    };
    onAdd(payload);
    setForm(initial);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add New Book</Card.Title>
        <Form onSubmit={submit}>
          <Row className="g-2">
            <Col md>
              <Form.Group>
                <Form.Label>Title *</Form.Label>
                <Form.Control name="title" value={form.title} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Author *</Form.Label>
                <Form.Control name="author" value={form.author} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 mt-2">
            <Col md>
              <Form.Group>
                <Form.Label>Genre *</Form.Label>
                <Form.Control name="genre" value={form.genre} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Price *</Form.Label>
                <Form.Control name="price" value={form.price} onChange={handleChange} required type="number" step="0.01" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-2 mt-2">
            <Col md>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control name="stock" value={form.stock} onChange={handleChange} type="number" />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Published Year</Form.Label>
                <Form.Control name="publishedYear" value={form.publishedYear} onChange={handleChange} type="number" />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button type="submit">Add Book</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
