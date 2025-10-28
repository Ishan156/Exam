import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteConfirmation({ book, onCancel, onConfirm }) {
  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete "<strong>{book.title}</strong>" by {book.author}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
