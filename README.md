# Lab 02: SQLite Database and CRUD Routes

## Student Details

- **Name:** Sai Rashmitha
- **Registration Number:** Add your registration number
- **GitHub Username:** Rashmitha1525
- **Section:** CSE (Gen-AI) 2A
- **Course:** Backend Development Fundamentals

## Objective

To connect an Express.js server with an SQLite database and implement CRUD operations using HTTP methods.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Installation

Clone the repository:

```bash
git clone https://github.com/Rashmitha1525/Lab-02.git
```

Navigate to the project folder:

```bash
cd Lab-02
```

Install dependencies:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
npm run dev
```

Server URL:

http://localhost:3000/

## Database

**Database Name:** database.db

**Table Name:** book

**Columns:**
- id
- title
- author
- price
- pages

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get a particular book |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update a book |
| DELETE | /books/:bookId/ | Delete a book |

## Screenshots

### Get All Books
![Get All Books](get-all-books.png)

### Get Single Book
![Get Single Book](get-single-book.png)

### Add Book
![Add Book](add-book.png)

### Update Book
![Update Book](update-book.png)

### Delete Book
![Delete Book](delete-book.png)

## Security

- Parameterized SQL queries are used.
- User input is validated.
- Sensitive environment files are excluded from GitHub.

## Problems Faced and Solutions

1. Database connection was established using the SQLite package.
2. CRUD operations were implemented using async/await.
3. SQL placeholders were used to prevent SQL injection.

## Conclusion

Successfully connected an Express.js server to an SQLite database and implemented five CRUD API endpoints to create, read, update and delete book records.

---

**Submitted by:** Sai Rashmitha  
**GitHub:** https://github.com/Rashmitha1525