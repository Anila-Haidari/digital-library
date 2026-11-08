// Shared storage functions.
// IMPORTANT: load js/data/books.js BEFORE this file (it defines sampleBooks).

const UPLOADED_BOOKS_KEY = "uploadedBooks";

// Only the books added from the Upload page
function getUploadedBooks() {
    try {
        const savedBooks = localStorage.getItem(UPLOADED_BOOKS_KEY);
        return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
        return [];
    }
}

// Sample books + uploaded books
function getAllBooks() {
    return sampleBooks.concat(getUploadedBooks());
}

// One book by id (number or text), or null if it does not exist
function getBookById(id) {
    const bookId = Number(id);

    const book = getAllBooks().find(function (item) {
        return item.id === bookId;
    });

    return book || null;
}

// Add an uploaded book. Returns true if saved, false if saving failed
function addBook(book) {
    try {
        const books = getUploadedBooks();
        books.push(book);
        localStorage.setItem(UPLOADED_BOOKS_KEY, JSON.stringify(books));
        return true;
    } catch (error) {
        return false;
    }
}

// Delete an uploaded book by id (sample books cannot be deleted)
function deleteBook(id) {
    const bookId = Number(id);

    const books = getUploadedBooks().filter(function (item) {
        return item.id !== bookId;
    });

    try {
        localStorage.setItem(UPLOADED_BOOKS_KEY, JSON.stringify(books));
        return true;
    } catch (error) {
        return false;
    }
}
