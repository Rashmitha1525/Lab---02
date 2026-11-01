
# Lab 2: SQLite Database and CRUD Routes

## Student Details

- Name: BORAVELLI GNANASAHITYA REDDY
- Registration Number: YOUR_REGISTRATION_NUMBER
- Section: YOUR_SECTION
- Course: Backend Development Fundamentals

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
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project folder:

```bash
cd BDF-Lab-02
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

Database Name: database.db

Table Name: book

Columns:
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

Add your actual Postman screenshots here.

Example:

![Get All Books](get-all-books.png)

![Get Single Book]()

![Add Book](screenshots/add-book.png)

![Update Book](screenshots/update-book.png)

![Delete Book](screenshots/delete-book.png)

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
