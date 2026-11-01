
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

app.use(express.json());

const databasePath = "./database.db";

let database = null;

// Initialize database and start server
const initializeDBAndServer = async () => {
  try {
    // Connect to SQLite database
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully!");

    // Create book table
    await database.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      );
    `);

    console.log("Book table created successfully!");

    // Insert 10 sample books if the table is empty
    const booksCount = await database.get(
      "SELECT COUNT(*) AS count FROM book;"
    );

    if (booksCount.count === 0) {
      const books = [
        ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180],
        ["The Alchemist", "Paulo Coelho", 300, 208],
        ["Atomic Habits", "James Clear", 450, 320],
        ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 240],
        ["The Power of Now", "Eckhart Tolle", 400, 236],
        ["Ikigai", "Hector Garcia", 280, 194],
        ["Think and Grow Rich", "Napoleon Hill", 320, 250],
        ["Deep Work", "Cal Newport", 380, 296],
        ["The 5 AM Club", "Robin Sharma", 420, 336],
        ["The Psychology of Money", "Morgan Housel", 290, 256],
      ];

      const insertQuery = `
        INSERT INTO book (title, author, price, pages)
        VALUES (?, ?, ?, ?);
      `;

      for (const book of books) {
        await database.run(insertQuery, book);
      }

      console.log("10 books inserted successfully!");
    }

    // Start server after successful database connection
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });

  } catch (error) {
    console.error("Database initialization error:", error.message);
    process.exit(1);
  }
};

// Homepage
app.get("/", (request, response) => {
  response.status(200).send(
    "Welcome to BDF Lab 2 - SQLite Database and CRUD Routes"
  );
});

// 1. GET - Retrieve all books
app.get("/books/", async (request, response) => {
  try {
    const books = await database.all(
      "SELECT * FROM book ORDER BY id;"
    );

    response.status(200).send(books);

  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
});

// 2. GET - Retrieve a single book
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return response.status(400).send({
        message: "Invalid book ID",
      });
    }

    const book = await database.get(
      "SELECT * FROM book WHERE id = ?;",
      [bookId]
    );

    if (!book) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    response.status(200).send(book);

  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
});

// 3. POST - Add a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    // Validate input
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      !Number.isInteger(price) ||
      price < 0 ||
      !Number.isInteger(pages) ||
      pages <= 0
    ) {
      return response.status(400).send({
        message: "Provide valid title, author, price and pages",
      });
    }

    const insertQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;

    const result = await database.run(insertQuery, [
      title.trim(),
      author.trim(),
      price,
      pages,
    ]);

    response.status(201).send({
      message: "Book added successfully",
      bookId: result.lastID,
    });

  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
});

// 4. PUT - Update an existing book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return response.status(400).send({
        message: "Invalid book ID",
      });
    }

    // Validate input
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      typeof author !== "string" ||
      author.trim() === "" ||
      !Number.isInteger(price) ||
      price < 0 ||
      !Number.isInteger(pages) ||
      pages <= 0
    ) {
      return response.status(400).send({
        message: "Provide valid title, author, price and pages",
      });
    }

    const updateQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;

    const result = await database.run(updateQuery, [
      title.trim(),
      author.trim(),
      price,
      pages,
      bookId,
    ]);

    if (result.changes === 0) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    response.status(200).send({
      message: "Book updated successfully",
    });

  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
});

// 5. DELETE - Delete a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    if (!/^[1-9]\d*$/.test(bookId)) {
      return response.status(400).send({
        message: "Invalid book ID",
      });
    }

    const deleteQuery = `
      DELETE FROM book WHERE id = ?;
    `;

    const result = await database.run(deleteQuery, [bookId]);

    if (result.changes === 0) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    response.status(200).send({
      message: "Book deleted successfully",
    });

  } catch (error) {
    response.status(500).send({
      message: error.message,
    });
  }
});

// Start application
initializeDBAndServer();
