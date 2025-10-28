import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

export default function BookList({ books, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive className="bg-white">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Published Year</th>
          <th>Added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 && (
          <tr>
            <td colSpan="8" className="text-center">No books found</td>
          </tr>
        )}
        {books.map(book => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>${Number(book.price).toFixed(2)}</td>
            <td>
              {book.stock <= 0 ? <Badge bg="danger">Out</Badge> : <span>{book.stock}</span>}
            </td>
            <td>{book.publishedYear || '-'}</td>
            <td>{new Date(book.createdAt).toLocaleDateString()}</td>
            <td>
              <Button size="sm" variant="outline-primary" className="me-2" onClick={() => onEdit(book)}>Edit</Button>
              <Button size="sm" variant="outline-danger" onClick={() => onDelete(book)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
