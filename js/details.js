const detailsContainer = document.getElementById("bookDetails");

// Get book ID from URL (details.html?id=3)
const urlParams = new URLSearchParams(window.location.search);

// Find selected book (sample or uploaded)
const selectedBook = getBookById(urlParams.get("id"));

// Display book details
if (selectedBook) {
    const hasPdf = Boolean(selectedBook.pdfUrl);

    const fileButtons = hasPdf
        ? `
                    <a href="reader.html?id=${selectedBook.id}">
                        Read Online
                    </a>

                    <a href="${selectedBook.pdfUrl}" download>
                        Download Book
                    </a>`
        : `
                    <p class="no-pdf">
                        PDF is not available for this book in the demo version.
                    </p>`;

    detailsContainer.innerHTML = `
        <div class="details-card">
            <img src="${selectedBook.cover}" alt="${selectedBook.title}">

            <div class="details-info">
                <h1>${selectedBook.title}</h1>

                <p><strong>Author:</strong> ${selectedBook.author}</p>
                <p><strong>Category:</strong> ${selectedBook.category}</p>
                <p><strong>Rating:</strong> ⭐ ${selectedBook.rating || "Not rated"}</p>

                <div class="details-description">
                    <h3>About This Book</h3>
                    <p>${selectedBook.description}</p>
                </div>

                <div class="details-buttons">
                    <a href="index.html#books">
                        Back to Books
                    </a>
                    ${fileButtons}
                </div>
            </div>
        </div>
    `;
} else {
    detailsContainer.innerHTML = `
        <div class="book-not-found">
            <h2>Book Not Found!</h2>
            <p>The book you are looking for does not exist.</p>
            <a href="index.html">Back to Home</a>
        </div>
    `;
}
