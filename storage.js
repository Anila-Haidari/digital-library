const STORAGE_KEY = "digital_library_uploaded_books";

function getUploadedBooks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function getAllBooks() {
  return SAMPLE_BOOKS.concat(getUploadedBooks());
}

function getBookById(id) {
  const numId = Number(id);
  const found = getAllBooks().find(function (book) {
    return book.id === numId;
  });
  return found || null;
}

function addBook(book) {
  try {
    const uploaded = getUploadedBooks();
    uploaded.push(book);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploaded));
    return true;
  } catch (e) {
    return false;
  }
}
