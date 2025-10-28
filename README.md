# Ishan Sudarsan


A simple Book Inventory project with:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React + Axios + React-Bootstrap
Features:
- CRUD API for books
- Frontend components: AddBookForm, BookList, EditBookModal, DeleteConfirmation
- Live UI updates after each CRUD operation
- Search/filter by title/author/genre, total count, out-of-stock count
- Dark mode toggle and toast notifications

Folder structure:
- backend/ — Express + Mongoose API
- frontend/ — React app

Quick start (local)
1. Start MongoDB locally (or use a cloud MongoDB URI).
   - Default DB name used in examples: `book_inventory`.
2. Backend:
   - cd backend
   - cp .env.example .env (edit MONGO_URI if needed)
   - npm install
   - npm run dev
   - Server runs on http://localhost:5000
3. Frontend:
   - cd frontend
   - npm install
   - npm start
   - Open http://localhost:3000

API Endpoints
- POST /api/books → Add a new book
- GET /api/books → Get all books
- PUT /api/books/:id → Update a book
- DELETE /api/books/:id → Delete a book

Notes
- If you need the DB name with a space (`book inventory`) you can set that in your connection string, but common practice is `book_inventory`.
- After pulling to your machine, set MONGO_URI in backend/.env to point to your MongoDB.

License: MIT
