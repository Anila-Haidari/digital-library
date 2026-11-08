const readerContainer = document.getElementById("readerContainer");

// Get book ID from URL (reader.html?id=3)
const urlParams = new URLSearchParams(window.location.search);

// Find selected book (sample or uploaded)
const selectedBook = getBookById(urlParams.get("id"));

if (!selectedBook) {
    readerContainer.innerHTML = `
        <div class="book-not-found">
            <h2>Book Not Found!</h2>
            <a href="index.html">Back to Home</a>
        </div>
    `;
} else if (!selectedBook.pdfUrl) {
    readerContainer.innerHTML = `
        <div class="book-not-found">
            <h2>${selectedBook.title}</h2>
            <p>PDF is not available for this book in the demo version.</p>
            <a href="details.html?id=${selectedBook.id}">Back to Book Details</a>
        </div>
    `;
} else {
    readerContainer.innerHTML = `
        <div class="reader-header">
            <h1>${selectedBook.title}</h1>
            <p>Author: ${selectedBook.author}</p>

            <a href="details.html?id=${selectedBook.id}">
                Back to Book Details
            </a>
        </div>

        <div class="pdf-viewer">
            <iframe
                src="${selectedBook.pdfUrl}"
                width="100%"
                height="650px"
                title="${selectedBook.title}">
            </iframe>
        </div>

        <div class="reader-download">
            <a href="${selectedBook.pdfUrl}" download>
                Download PDF
            </a>
        </div>
    `;
}
